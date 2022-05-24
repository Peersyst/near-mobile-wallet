import { mnemonic, ExtendedPrivateKey, AccountExtendedPublicKey, AddressType } from "@ckb-lumos/hd";
import { ConnectionService } from "./connection.service";
import { TransactionService, Transaction, FeeRate } from "./transaction.service";
import { TokenService, TokenAmount } from "./assets/token.service";
import { CKBBalance, CKBService } from "./assets/ckb.service";
import { DAOBalance, DAOService, DAOStatistics, DAOUnlockableAmount } from "./dao/dao.service";
import { Cell, Script } from "@ckb-lumos/lumos";
import { QueryOptions } from "@ckb-lumos/base";
import { Nft, NftService } from "./assets/nft.service";
import { Logger } from "../utils/logger";

export enum AddressScriptType {
    SECP256K1_BLAKE160 = "SECP256K1_BLAKE160",
    SUDT = "SUDT",
    DAO = "DAO",
}

export interface Balance {
    ckb: CKBBalance;
    tokens: TokenAmount[];
    nfts: Nft[];
    dao: DAOBalance;
}

export interface addressMapI {
    [key: string]: string;
}

export interface cellMapI {
    [key: string]: Cell[];
}

export interface transactionMapI {
    [key: string]: Transaction[];
}

export interface WalletState {
    addressMap: addressMapI;
    firstRIndexWithoutTxs: number;
    firstCIndexWithoutTxs: number;
    lastHashBlock: string;
    accountCellsMap: cellMapI;
    accountTransactionMap: transactionMapI;
}

export class WalletService {
    private readonly connection: ConnectionService;
    private readonly transactionService: TransactionService;
    private readonly ckbService: CKBService;
    private readonly tokenService: TokenService;
    private readonly daoService: DAOService;
    private readonly nftService: NftService;
    private readonly accountPublicKey: AccountExtendedPublicKey;
    private readonly logger = new Logger(WalletService.name);
    private addressMap: addressMapI = {};
    private firstRIndexWithoutTxs = 0;
    private firstCIndexWithoutTxs = 0;
    private lastHashBlock!: string;
    private accountCellsMap: cellMapI = {};
    private accountTransactionMap: transactionMapI = {};
    private onSync!: (walletState: WalletState) => Promise<void>;
    private onSyncStart!: () => void;
    private synchronizing = false;

    constructor(
        connectionService: ConnectionService,
        mnemo: string,
        walletState?: WalletState,
        onSync?: (walletState: WalletState) => Promise<void>,
        onSyncStart?: () => void,
    ) {
        if (!WalletService.validateMnemonic(mnemo)) {
            this.logger.error("Invalid Mnemonic");
            throw new Error("Invalid Mnemonic");
        }

        this.connection = connectionService;
        this.nftService = new NftService(this.connection);
        this.transactionService = new TransactionService(this.connection, this.nftService);
        this.ckbService = new CKBService(this.connection, this.transactionService);
        this.tokenService = new TokenService(this.connection, this.transactionService);
        this.daoService = new DAOService(this.connection, this.transactionService);

        if (walletState) {
            this.addressMap = walletState.addressMap ? { ...walletState.addressMap } : this.addressMap;
            this.firstRIndexWithoutTxs = walletState.firstRIndexWithoutTxs || 0;
            this.firstCIndexWithoutTxs = walletState.firstCIndexWithoutTxs || 0;
            this.lastHashBlock = walletState.lastHashBlock || null!;
            this.accountCellsMap = walletState.accountCellsMap ? { ...walletState.accountCellsMap } : this.accountCellsMap;
            this.accountTransactionMap = walletState.accountTransactionMap
                ? { ...walletState.accountTransactionMap }
                : this.accountTransactionMap;
        }

        if (onSync) {
            this.onSync = onSync;
        }
        if (onSyncStart) {
            this.onSyncStart = onSyncStart;
        }

        this.accountPublicKey = WalletService.getPrivateKeyFromMnemonic(mnemo).toAccountExtendedPublicKey();
    }

    static createNewMnemonic() {
        return mnemonic.generateMnemonic();
    }

    static validateMnemonic(mnemo: string): boolean {
        return mnemonic.validateMnemonic(mnemo);
    }

    private static getPrivateKeyFromMnemonic(mnemo: string): ExtendedPrivateKey {
        const seed = mnemonic.mnemonicToSeedSync(mnemo);
        return ExtendedPrivateKey.fromSeed(seed);
    }

    // ----------------------
    // -- Wallet functions --
    // ----------------------
    getWalletState(): WalletState {
        return {
            addressMap: { ...this.addressMap },
            firstRIndexWithoutTxs: this.firstRIndexWithoutTxs,
            firstCIndexWithoutTxs: this.firstCIndexWithoutTxs,
            lastHashBlock: this.lastHashBlock,
            accountCellsMap: { ...this.accountCellsMap },
            accountTransactionMap: { ...this.accountTransactionMap },
        };
    }

    async synchronize(): Promise<WalletState> {
        if (this.synchronizing) return this.getWalletState();
        this.synchronizing = true;
        if (this.onSyncStart) this.onSyncStart();
        let toBlock: string;
        let fromBlock: string;
        const currentBlock = await this.connection.getCurrentBlockHeader();

        if (!this.lastHashBlock) {
            toBlock = currentBlock.number;
        } else {
            fromBlock = this.lastHashBlock;
            toBlock = currentBlock.number;
        }

        const cellProvider = this.connection.getCellProvider({ toBlock });

        const addressTypes: AddressType[] = [AddressType.Receiving, AddressType.Change];
        for (const addressType of addressTypes) {
            let currentIndex = 0;
            let firstIndex = addressType === AddressType.Receiving ? this.firstRIndexWithoutTxs : this.firstCIndexWithoutTxs;

            while (currentIndex <= firstIndex) {
                const lock = this.getLock(currentIndex, addressType as AddressType);
                const hasTransactions = await this.transactionService.lockScriptHasTransactions(lock);

                if (hasTransactions) {
                    const mapKey = `${addressType}-${currentIndex}`;

                    // Update cells
                    const newCells: Cell[] = [];
                    const collectorOptions: QueryOptions = { lock: this.getLock(currentIndex, addressType as AddressType), toBlock };
                    const cellCollector = cellProvider.collector(collectorOptions);
                    for await (const cell of cellCollector.collect()) {
                        newCells.push(cell);
                    }
                    this.accountCellsMap[mapKey] = newCells;

                    // Update indexes
                    if (currentIndex === firstIndex) {
                        firstIndex += 1;
                    }
                }
                currentIndex += 1;
            }
            if (addressType === AddressType.Receiving) {
                this.firstRIndexWithoutTxs = firstIndex;
            } else {
                this.firstCIndexWithoutTxs = firstIndex;
            }
        }

        const allAddresses = this.getAllAddresses();
        for (const addressType of addressTypes) {
            const firstIndex = addressType === AddressType.Receiving ? this.firstRIndexWithoutTxs : this.firstCIndexWithoutTxs;

            for (let i = 0; i < firstIndex; i += 1) {
                const mapKey = `${addressType}-${i}`;
                const address = this.getAddress(i, addressType as AddressType);
                const transactions = await this.transactionService.getTransactions(address, allAddresses, toBlock, fromBlock!);

                // Update transactions
                const currentTxs: Transaction[] = this.accountTransactionMap[mapKey] || [];
                this.accountTransactionMap[mapKey] = [...currentTxs, ...transactions];
            }
        }

        this.lastHashBlock = currentBlock.number;

        const walletState = this.getWalletState();
        if (this.onSync) {
            await this.onSync(walletState);
        }
        this.synchronizing = false;

        return walletState;
    }

    getCells(): Cell[] {
        return [...Object.values(this.accountCellsMap)].flat(1);
    }

    getNextAddress(): string {
        return this.getAddress(this.firstRIndexWithoutTxs, AddressType.Receiving);
    }

    getAccountIndexes(addressType: AddressType = AddressType.Receiving): number[] {
        if (addressType === AddressType.Receiving) {
            return [...Array(this.firstRIndexWithoutTxs).keys()];
        }
        return [...Array(this.firstCIndexWithoutTxs).keys()];
    }

    getLock(accountId = 0, addressType: AddressType, script: AddressScriptType = AddressScriptType.SECP256K1_BLAKE160): Script {
        const template = this.connection.getConfig().SCRIPTS[script];
        const lockScript = {
            code_hash: template!.CODE_HASH,
            hash_type: template!.HASH_TYPE,
            args: this.accountPublicKey.publicKeyInfo(addressType, accountId).blake160,
        };

        return lockScript;
    }

    getAddress(accountId = 0, addressType: AddressType, script: AddressScriptType = AddressScriptType.SECP256K1_BLAKE160): string {
        const key = `${accountId}-${addressType}-${script}`;
        if (!this.addressMap[key]) {
            const address = this.connection.getAddressFromLock(this.getLock(accountId, addressType, script));
            this.addressMap[key] = address;
        }

        return this.addressMap[key];
    }

    getAllAddresses(): string[] {
        const addresses = [];
        for (let i = 0; i < this.firstRIndexWithoutTxs; i += 1) {
            addresses.push(this.getAddress(i, AddressType.Receiving));
        }
        for (let i = 0; i < this.firstCIndexWithoutTxs; i += 1) {
            addresses.push(this.getAddress(i, AddressType.Change));
        }

        return addresses;
    }

    getAllPrivateKeys(mnemo: string): string[] {
        const extPrivateKey = WalletService.getPrivateKeyFromMnemonic(mnemo);
        const privateKeys = [];
        for (let i = 0; i < this.firstRIndexWithoutTxs; i += 1) {
            privateKeys.push(extPrivateKey.privateKeyInfo(AddressType.Receiving, i).privateKey);
        }
        for (let i = 0; i < this.firstCIndexWithoutTxs; i += 1) {
            privateKeys.push(extPrivateKey.privateKeyInfo(AddressType.Change, i).privateKey);
        }

        return privateKeys;
    }

    getAddressAndPrivateKey(
        mnemo: string,
        accountId = 0,
        script: AddressScriptType = AddressScriptType.SECP256K1_BLAKE160,
    ): { address: string; privateKey: string } {
        const address = this.getAddress(accountId, AddressType.Receiving, script);
        const extPrivateKey = WalletService.getPrivateKeyFromMnemonic(mnemo);
        const privateKey = extPrivateKey.privateKeyInfo(AddressType.Receiving, accountId).privateKey;

        return { address, privateKey };
    }

    getAddressAndPrivKeyFromLock(mnemo: string, lock: Script): { address: string; privateKey: string } {
        const address = this.connection.getAddressFromLock(lock);
        const extPrivateKey = WalletService.getPrivateKeyFromMnemonic(mnemo);
        const addresses = this.getAllAddresses();

        let privateKey: string;
        if (addresses.indexOf(address) < this.firstRIndexWithoutTxs) {
            ({ privateKey } = extPrivateKey.privateKeyInfo(AddressType.Receiving, addresses.indexOf(address)));
        } else {
            ({ privateKey } = extPrivateKey.privateKeyInfo(AddressType.Change, addresses.indexOf(address) - this.firstRIndexWithoutTxs));
        }

        return { address, privateKey };
    }

    async getBalanceFromAccount(accountId = 0, addressType: AddressType = AddressType.Receiving): Promise<Balance> {
        const address = this.getAddress(accountId, addressType);
        const ckb = await this.ckbService.getBalance(address);
        const tokens = await this.tokenService.getBalance(address);
        const nfts = await this.nftService.getBalance(address);
        const dao = await this.daoService.getBalance(address);

        return { ckb, tokens, dao, nfts };
    }

    async getBalance(): Promise<Balance> {
        const cells = this.getCells();
        const ckb = this.ckbService.getBalanceFromCells(cells);
        const tokens = this.tokenService.getBalanceFromCells(cells);
        const nfts = await this.nftService.getBalanceFromCells(cells);
        const dao = await this.daoService.getBalanceFromCells(cells);

        return { ckb, tokens, dao, nfts };
    }

    // -----------------------------------
    // -- Transaction service functions --
    // -----------------------------------
    async getTransactionsFromAccount(accountId = 0, addressType: AddressType = AddressType.Receiving): Promise<Transaction[]> {
        const address = this.getAddress(accountId, addressType);

        return this.transactionService.getTransactions(address, this.getAllAddresses());
    }

    getTransactions(): Transaction[] {
        const sortedTxs = [...Object.values(this.accountTransactionMap)].flat(1).sort((txa, txb) => txa.blockNumber! - txb.blockNumber!);

        // Remove equal transactions
        for (let i = 0; i < sortedTxs.length; i += 1) {
            let j = i + 1;

            while (j < sortedTxs.length) {
                if (sortedTxs[i].transactionHash === sortedTxs[j].transactionHash && sortedTxs[i].type === sortedTxs[j].type) {
                    sortedTxs.splice(j, 1);
                } else {
                    j += 1;
                }
            }
        }

        return sortedTxs;
    }

    async getTransactionFromHash(txHash: string): Promise<Transaction> {
        return this.transactionService.getTransactionFromHash(txHash, [...this.getAllAddresses(), this.getNextAddress()]);
    }

    // ---------------------------
    // -- CKB service functions --
    // ---------------------------
    async sendTransactionSingleAccount(
        amount: bigint,
        mnemo: string,
        to: string,
        accountId: number,
        feeRate: FeeRate = FeeRate.NORMAL,
    ): Promise<string> {
        const { address, privateKey } = this.getAddressAndPrivateKey(mnemo, accountId);
        await this.synchronize();

        return this.ckbService.transfer(address, to, amount, privateKey, feeRate);
    }

    async sendTransaction(amount: bigint, mnemo: string, to: string, feeRate: FeeRate = FeeRate.NORMAL): Promise<string> {
        await this.synchronize();
        const addresses = this.getAllAddresses();
        const privateKeys = this.getAllPrivateKeys(mnemo);

        return this.ckbService.transferFromCells(this.getCells(), addresses, to, amount, privateKeys, feeRate);
    }

    async getCKBBalanceFromAccount(accountId = 0, addressType: AddressType = AddressType.Receiving): Promise<CKBBalance> {
        const address = this.getAddress(accountId, addressType);
        return this.ckbService.getBalance(address);
    }

    getCKBBalance(): CKBBalance {
        return this.ckbService.getBalanceFromCells(this.getCells());
    }

    // -----------------------------
    // -- Token service functions --
    // -----------------------------
    // Deprecated in accounts
    async issueTokens(amount: number, mnemo: string, accountId = 0, feeRate: FeeRate = FeeRate.NORMAL): Promise<string> {
        const { address, privateKey } = this.getAddressAndPrivateKey(mnemo, accountId);

        return this.tokenService.issue(address, amount, privateKey, feeRate);
    }

    // Deprecated in accounts
    async transferTokens(
        amount: number,
        mnemo: string,
        to: string,
        token: string,
        accountId = 0,
        feeRate: FeeRate = FeeRate.NORMAL,
    ): Promise<string> {
        const { address, privateKey } = this.getAddressAndPrivateKey(mnemo, accountId);

        return this.tokenService.transfer(address, to, token, amount, privateKey, feeRate);
    }

    async getTokensBalanceFromAccount(accountId = 0, addressType: AddressType = AddressType.Receiving): Promise<TokenAmount[]> {
        const address = this.getAddress(accountId, addressType);
        return this.tokenService.getBalance(address);
    }

    getTokensBalance(): TokenAmount[] {
        return this.tokenService.getBalanceFromCells(this.getCells());
    }

    // -----------------------------
    // -- Nft service functions --
    // -----------------------------

    async getNftsBalanceFromAccount(accountId = 0, addressType: AddressType = AddressType.Receiving): Promise<Nft[]> {
        const address = this.getAddress(accountId, addressType);
        return this.nftService.getBalance(address);
    }

    async getNftsBalance(): Promise<Nft[]> {
        return this.nftService.getBalanceFromCells(this.getCells());
    }

    // ---------------------------
    // -- DAO service functions --
    // ---------------------------
    async depositInDAOSingleAccount(amount: bigint, mnemo: string, accountId = 0, feeRate: FeeRate = FeeRate.NORMAL): Promise<string> {
        const { address, privateKey } = this.getAddressAndPrivateKey(mnemo, accountId);
        return this.daoService.deposit(amount, address, address, privateKey, feeRate);
    }

    async depositInDAO(amount: bigint, mnemo: string, feeRate: FeeRate = FeeRate.NORMAL): Promise<string> {
        await this.synchronize();
        const addresses = this.getAllAddresses();
        const privateKeys = this.getAllPrivateKeys(mnemo);

        return this.daoService.depositMultiAccount(amount, this.getCells(), addresses, this.getNextAddress(), privateKeys, feeRate);
    }

    async withdrawOrUnlockFromCell(cell: Cell, mnemo: string, feeRate: FeeRate = FeeRate.NORMAL): Promise<string> {
        const { address, privateKey } = this.getAddressAndPrivKeyFromLock(mnemo, cell.cell_output.lock);
        const feeAddresses = this.getAllAddresses();
        const privateKeys = this.getAllPrivateKeys(mnemo);
        const to = this.getNextAddress();

        if (!this.daoService.isCellDeposit(cell)) {
            this.logger.info("Unlocking withdraw cell");

            // Check real unlockability
            if (!(await this.daoService.isCellUnlockable(cell))) {
                throw new Error("Cell can not yet be unlocked.");
            }
            return this.daoService.unlock(cell, privateKey, address, to, feeAddresses, privateKeys, feeRate);
        }

        this.logger.info("Withdrawing deposit cell");
        return this.daoService.withdraw(cell, privateKey, feeAddresses, privateKeys, feeRate);
    }

    async withdrawOrUnlock(unlockableAmount: DAOUnlockableAmount, mnemo: string): Promise<string> {
        await this.synchronize();
        const cells = await this.daoService.filterDAOCells(this.getCells());

        const cell = await this.daoService.findCellFromUnlockableAmountAndCells(unlockableAmount, cells);
        if (!cell) {
            throw new Error("Cell related to unlockable amount not found!");
        }
        this.logger.info(cell);
        return this.withdrawOrUnlockFromCell(cell, mnemo);
    }

    async getDAOStatisticsFromAccount(accountId = 0, addressType: AddressType = AddressType.Receiving): Promise<DAOStatistics> {
        const address = this.getAddress(accountId, addressType);
        return this.daoService.getStatistics(address);
    }

    async getDAOStatistics(): Promise<DAOStatistics> {
        return this.daoService.getStatisticsFromCells(this.getCells());
    }

    async getDAOBalanceFromAccount(accountId = 0, addressType: AddressType = AddressType.Receiving): Promise<DAOBalance> {
        const address = this.getAddress(accountId, addressType);
        return this.daoService.getBalance(address);
    }

    async getDAOBalance(): Promise<DAOBalance> {
        return this.daoService.getBalanceFromCells(this.getCells());
    }

    async getDAOUnlockableAmountsFromAccount(
        accountId = 0,
        addressType: AddressType = AddressType.Receiving,
    ): Promise<DAOUnlockableAmount[]> {
        const address = this.getAddress(accountId, addressType);
        return this.daoService.getUnlockableAmounts(address);
    }

    async getDAOUnlockableAmounts(): Promise<DAOUnlockableAmount[]> {
        return this.daoService.getUnlockableAmountsFromCells(this.getCells());
    }
}
