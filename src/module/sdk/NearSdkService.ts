import { connect, keyStores, Near, ConnectConfig, Account } from "near-api-js";
import { AccountBalance } from "near-api-js/lib/account";
import { AccountView, FinalExecutionOutcome } from "near-api-js/lib/providers/provider";
import { KeyPairEd25519, PublicKey } from "near-api-js/lib/utils";
const { parseSeedPhrase, generateSeedPhrase } = require("near-seed-phrase");
import { decode, encode } from "bs58";

const bip39 = require("bip39-light");
import { mockNfts } from "./near-nfts.mock";
import {
    Chains,
    StakingBalance,
    Validator,
    TokenMetadata,
    Token,
    NftMetadata,
    NftToken,
    Transaction,
    FullTransaction,
    TransactionStatus,
} from "./NearSdkService.types";
import {
    MINIMUM_UNSTAKED,
    DEPOSIT_STAKE_METHOD,
    UNSTAKE_METHOD,
    UNSTAKE_ALL_METHOD,
    WITHDRAW_METHOD,
    WITHDRAW_ALL_METHOD,
    ACCOUNT_TOTAL_BALANCE_METHOD,
    ACCOUNT_STAKED_BALANCE_METHOD,
    ACCOUNT_UNSTAKED_BALANCE_METHOD,
    IS_ACCOUNT_UNSTAKED_BALANCE_AVAILABLE_METHOD,
    REWARD_FEE_FRACTION_METHOD,
    NFT_TRANSFER_METHOD,
    NFT_TRANSFER_GAS,
    TOKEN_TRANSFER_DEPOSIT,
    FT_TRANSFER_GAS,
    FT_STORAGE_DEPOSIT_GAS,
    FT_TRANSFER_METHOD,
    STORAGE_BALANCE_METHOD,
    STORAGE_DEPOSIT_METHOD,
    FT_MINIMUM_STORAGE_BALANCE,
    FT_MINIMUM_STORAGE_BALANCE_LARGE,
    FT_METADATA_METHOD,
    FT_BALANCE_METHOD,
    NFT_METADATA_METHOD,
    NFT_TOKEN_METHOD,
    NFT_SUPPLY_METHOD,
    NFT_OWNER_TOKENS_METHOD,
    NFT_TOKEN_METADATA_METHOD,
    NFT_OWNER_TOKENS_SET_METHOD,
} from "./near.constants";
import { convertAccountBalanceToNear as convertAccountBalanceToNearUtil, convertNearToYocto } from "./near.utils";
import { NearApiService } from "./NearApiService";

export class NearSDKService {
    private connection?: Near;
    private nearConfig: ConnectConfig;
    private nameId: string;
    private keyPair: KeyPairEd25519;
    private chain: Chains;
    private masterAccount: string;
    private mnemonic?: string;
    private baseApiUrl: string;
    private static nameRegex = /^(([a-z\d]+[-_])*[a-z\d]+\.)*([a-z\d]+[-_])*[a-z\d]+$/;
    private static addressRegex = /[\da-f]/i;
    public nearDecimals: number | undefined;

    constructor(
        chain: Chains,
        nodeUrl: string,
        baseApiUrl: string,
        secretKey: string,
        nameId: string,
        nearDecimals?: number,
        mnemonic?: string,
    ) {
        this.chain = chain;
        this.masterAccount = chain === Chains.MAINNET ? "near" : this.chain;
        this.nameId = nameId;
        this.mnemonic = mnemonic;
        this.baseApiUrl = baseApiUrl;
        this.nearDecimals = nearDecimals;
        // Create KeyPairEd25519
        this.keyPair = NearSDKService.createKeyPairFromSecretKey(secretKey);

        const keyStore = new keyStores.InMemoryKeyStore();
        keyStore.setKey(chain, nameId, this.keyPair);

        this.nearConfig = {
            networkId: chain,
            keyStore,
            nodeUrl,
        };
    }

    // --------------------------------------------------------------
    // -- CREATION FUNCTIONS ----------------------------------------
    // --------------------------------------------------------------
    static getAddressFromPublicKey(publicKey: PublicKey): string {
        return decode(encode(publicKey.data)).toString("hex");
    }

    static async createAndConnect(chain: Chains, nodeUrl: string, baseApiUrl: string, nearDecimals?: number): Promise<NearSDKService> {
        const { seedPhrase, secretKey, publicKey } = generateSeedPhrase();
        const nameId = NearSDKService.getAddressFromPublicKey(PublicKey.fromString(publicKey));

        const service = new NearSDKService(chain, nodeUrl, baseApiUrl, secretKey, nameId, nearDecimals, seedPhrase);
        await service.connect();
        return service;
    }

    static async importFromMnemonic(
        chain: Chains,
        nodeUrl: string,
        baseApiUrl: string,
        mnemonic: string,
        nearDecimals?: number,
    ): Promise<NearSDKService[]> {
        const { secretKey, publicKey } = parseSeedPhrase(mnemonic);
        const nameIds = await NearApiService.getAccountsFromPublicKey(publicKey, baseApiUrl);
        if (nameIds.length === 0) {
            nameIds.push(NearSDKService.getAddressFromPublicKey(PublicKey.fromString(publicKey)));
        }

        const services = nameIds.map(async (nameId) => {
            const service = new NearSDKService(chain, nodeUrl, baseApiUrl, secretKey, nameId, nearDecimals, mnemonic);
            await service.connect();
            return service;
        });
        return Promise.all(services);
    }

    static async importFromSecretKey(
        chain: Chains,
        nodeUrl: string,
        baseApiUrl: string,
        secretKey: string,
        nearDecimals?: number,
    ): Promise<NearSDKService[]> {
        const secret = secretKey.split(":").pop();
        const publicKey = new KeyPairEd25519(secret!).getPublicKey().toString();
        const nameIds = await NearApiService.getAccountsFromPublicKey(publicKey, baseApiUrl);
        if (nameIds.length === 0) {
            nameIds.push(NearSDKService.getAddressFromPublicKey(PublicKey.fromString(publicKey)));
        }
        const services = nameIds.map(async (nameId) => {
            const service = new NearSDKService(chain, nodeUrl, baseApiUrl, secretKey, nameId, nearDecimals);
            await service.connect();
            return service;
        });
        return Promise.all(services);
    }

    static createNewMnemonic(): string {
        return bip39.generateMnemonic();
    }

    // --------------------------------------------------------------
    // -- COMMON FUNCTIONS ------------------------------------------
    // --------------------------------------------------------------
    private async getAccount(): Promise<Account> {
        if (!this.connection) {
            throw new Error("Not connected");
        }
        const address = this.getAddress();
        return this.connection.account(address);
    }

    async connect(): Promise<void> {
        this.connection = await connect(this.nearConfig);
    }

    getAddress(): string {
        return this.nameId;
    }

    getMnemonic(): string | undefined {
        return this.mnemonic;
    }

    getKeyPair(): string {
        return this.keyPair.toString();
    }

    async accountExists(nameId: string): Promise<boolean> {
        // Could also be checked through our indexer api instead of rpc

        if (!this.connection) {
            throw new Error("Not connected");
        }

        let exists = true;
        try {
            await this.connection.connection.provider.query<AccountView>({
                request_type: "view_account",
                account_id: nameId,
                finality: "final",
            });
        } catch (e: any) {
            if (e.type === "AccountDoesNotExist" || e.toString().includes("does not exist")) {
                exists = false;
            }
        }

        return exists;
    }

    static isImplicitAddress(accountId: string): boolean {
        return accountId.length === 64 && NearSDKService.addressRegex.test(accountId);
    }

    static nameIdIsValid(nameId: string): boolean {
        return nameId.length >= 2 && nameId.length <= 64 && NearSDKService.nameRegex.test(nameId);
    }

    static isImplicitAddressOrNameValid(accoutOrNameId: string): boolean {
        return NearSDKService.nameIdIsValid(accoutOrNameId) || NearSDKService.isImplicitAddress(accoutOrNameId);
    }

    static validateMnemonic(mnemonic: string): boolean {
        return bip39.validateMnemonic(mnemonic);
    }

    static createKeyPairFromSecretKey(secretKey: string): KeyPairEd25519 {
        return KeyPairEd25519.fromString(secretKey) as KeyPairEd25519;
    }

    static isSecretKeyValid(secretKey: string): boolean {
        try {
            this.createKeyPairFromSecretKey(secretKey);
            return true;
        } catch (e) {
            return false;
        }
    }

    async accountCanReceive(accountId: string): Promise<boolean> {
        return NearSDKService.isImplicitAddress(accountId) || this.accountExists(accountId);
    }

    async nameIsChoosalbe(nameId: string): Promise<boolean> {
        const exist = await this.accountExists(nameId);
        return !exist && NearSDKService.nameIdIsValid(nameId);
    }

    // Amount is in near
    private async createNewAccount(nameId: string, publicKey: PublicKey, amount: string): Promise<string> {
        const account = await this.getAccount();

        if (nameId.includes(account.accountId)) {
            const tx = await account.createAccount(nameId, publicKey, this.parseNearAmount(amount));
            return tx.transaction_outcome.id;
        }

        const tx = await account.functionCall({
            contractId: this.masterAccount,
            methodName: "create_account",
            args: { new_account_id: nameId, new_public_key: publicKey.toString() },
            attachedDeposit: this.parseNearAmount(amount),
        });
        return tx.transaction_outcome.id;
    }

    // Amount is in near
    async createNewAccountWithNewMnemonic(nameId: string, amount: string, nearDecimals?: number): Promise<NearSDKService> {
        const exists = await this.accountExists(nameId);
        if (exists) {
            throw new Error("Account already exists");
        }

        const { seedPhrase, publicKey, secretKey } = generateSeedPhrase();
        await this.createNewAccount(nameId, PublicKey.fromString(publicKey), amount);

        const service = new NearSDKService(
            this.chain,
            this.nearConfig.nodeUrl,
            this.baseApiUrl,
            secretKey,
            nameId,
            nearDecimals,
            seedPhrase,
        );
        await service.connect();
        return service;
    }

    // Amount is in near
    async createNewAccountWithNewSecretKey(nameId: string, amount: string, nearDecimals?: number): Promise<NearSDKService> {
        const exists = await this.accountExists(nameId);
        if (exists) {
            throw new Error("Account already exists");
        }

        const keyPair = KeyPairEd25519.fromRandom();
        await this.createNewAccount(nameId, keyPair.getPublicKey(), amount);

        const service = new NearSDKService(this.chain, this.nearConfig.nodeUrl, this.baseApiUrl, keyPair.secretKey, nameId, nearDecimals);
        await service.connect();
        return service;
    }

    // Amount is in near
    async createNewAccountWithSameSecretKey(nameId: string, amount: string, nearDecimals?: number): Promise<NearSDKService | undefined> {
        const exists = await this.accountExists(nameId);
        if (exists) {
            throw new Error("Account already exists");
        }
        try {
            await this.createNewAccount(nameId, this.keyPair.getPublicKey(), amount);

            const service = new NearSDKService(
                this.chain,
                this.nearConfig.nodeUrl,
                this.baseApiUrl,
                this.keyPair.secretKey,
                nameId,
                nearDecimals,
            );
            await service.connect();
            return service;
        } catch (e) {
            // eslint-disable-next-line no-console
            console.warn("Error creating new account", e);
            return;
        }
    }

    async deleteAccount(beneficiaryId: string): Promise<string> {
        const account = await this.getAccount();
        const tx = await account.deleteAccount(beneficiaryId);
        return tx.transaction_outcome.id;
    }

    // --------------------------------------------------------------
    // -- UTILS FUNCTIONS ------------------------------------
    // --------------------------------------------------------------
    public parseNearAmount(amount: string): string {
        return convertNearToYocto(amount);
    }
    public convertAccountBalanceToNear(accountBalance: AccountBalance): AccountBalance {
        return convertAccountBalanceToNearUtil(accountBalance, this.nearDecimals);
    }

    // --------------------------------------------------------------
    // -- WALLET STATE FUNCTIONS ------------------------------------
    // --------------------------------------------------------------
    //Returns the balance in near
    async getAccountBalance(): Promise<AccountBalance> {
        try {
            const account = await this.getAccount();
            const accountBalance: AccountBalance = await account.getAccountBalance();
            return this.convertAccountBalanceToNear(accountBalance);
        } catch (e: any) {
            return {
                total: "0",
                available: "0",
                staked: "0",
                stateStaked: "0",
            };
        }
    }

    async getAccountState(): Promise<AccountView> {
        const account = await this.getAccount();
        return account.state();
    }

    // --------------------------------------------------------------
    // -- TRANSACTIONS FUNCTIONS ------------------------------------
    // --------------------------------------------------------------
    // Amount is in near
    async sendTransaction(to: string, amount: string): Promise<string> {
        const account = await this.getAccount();
        const amountInYocto = this.parseNearAmount(amount);

        const tx = await account.sendMoney(to, amountInYocto);
        return tx.transaction_outcome.id;
    }

    async getTransactionStatus(txHash: string): Promise<FinalExecutionOutcome> {
        if (!this.connection) {
            throw new Error("Not connected");
        }

        const address = this.getAddress();
        return this.connection.connection.provider.txStatus(txHash, address);
    }

    async getTransaction(txHash: string): Promise<FullTransaction> {
        return {
            transactionHash: txHash,
            status: TransactionStatus.COMMITTED,
        } as any;
    }

    async getTransactions(page = 1, pageSize = 15): Promise<Transaction[]> {
        return NearApiService.getTransactions(this.getAddress(), this.baseApiUrl, page, pageSize);
    }

    // --------------------------------------------------------------
    // -- STAKING FUNCTIONS -----------------------------------------
    // --------------------------------------------------------------
    // Staking without validator
    // Amount is in near
    async stake(amount: string): Promise<string> {
        const account = await this.getAccount();
        const amountInYocto = this.parseNearAmount(amount);

        const tx = await account.stake(this.keyPair.getPublicKey(), amountInYocto);
        return tx.transaction_outcome.id;
    }

    // Staking without validator
    async unstake(): Promise<string> {
        const account = await this.getAccount();

        const tx = await account.stake(this.keyPair.getPublicKey(), 0);
        return tx.transaction_outcome.id;
    }

    private async getValidatorFee(validatorId: string): Promise<number> {
        const account = await this.getAccount();

        const resp = await account.viewFunction({ contractId: validatorId, methodName: REWARD_FEE_FRACTION_METHOD, args: {} });
        return +((resp.numerator * 100) / resp.denominator);
    }

    private async getValidatorBalance(validatorId: string, validatorDeposit?: number): Promise<StakingBalance> {
        const account = await this.getAccount();
        const stakingBalance: StakingBalance = {
            staked: 0,
            available: 0,
            pending: 0,
        };

        const total = await account.viewFunction({
            contractId: validatorId,
            methodName: ACCOUNT_TOTAL_BALANCE_METHOD,
            args: { account_id: account.accountId },
        });

        if (validatorDeposit) {
            stakingBalance.rewardsEarned = total - validatorDeposit;
        }

        if (parseInt(total, 10) > 0) {
            const stakedStr = await account.viewFunction({
                contractId: validatorId,
                methodName: ACCOUNT_STAKED_BALANCE_METHOD,
                args: { account_id: account.accountId },
            });
            stakingBalance.staked = parseInt(stakedStr, 10);

            const unstakedStr = await account.viewFunction({
                contractId: validatorId,
                methodName: ACCOUNT_UNSTAKED_BALANCE_METHOD,
                args: { account_id: account.accountId },
            });

            if (parseInt(unstakedStr, 10) > MINIMUM_UNSTAKED) {
                const isAvailable = await account.viewFunction({
                    contractId: validatorId,
                    methodName: IS_ACCOUNT_UNSTAKED_BALANCE_AVAILABLE_METHOD,
                    args: { account_id: account.accountId },
                });

                if (isAvailable) {
                    stakingBalance.available = parseInt(unstakedStr, 10);
                } else {
                    stakingBalance.pending = parseInt(unstakedStr, 10);
                }
            }
        }

        return stakingBalance;
    }

    private async getAllValidatorIds(): Promise<string[]> {
        if (!this.connection) {
            throw new Error("Not connected");
        }

        const status = await this.connection.connection.provider.status();
        return status.validators.map((validator: any) => validator.account_id);
    }

    private async getValidatorDataFromId(validatorId: string, queryBalance: boolean, totalDeposits?: number): Promise<Validator> {
        let fee: number | null;
        let stakingBalance: StakingBalance | null;

        try {
            fee = await this.getValidatorFee(validatorId);
            if (queryBalance) {
                stakingBalance = await this.getValidatorBalance(validatorId, totalDeposits);
                return { accountId: validatorId, fee, stakingBalance };
            }
        } catch (e) {
            fee = null;
        }

        return { accountId: validatorId, fee };
    }

    async getAllValidators(): Promise<Validator[]> {
        const validators = await this.getAllValidatorIds();
        const validatorsProms = validators.map((validator) => this.getValidatorDataFromId(validator, false));

        return Promise.all(validatorsProms);
    }

    async getTotalStakingBalance(): Promise<StakingBalance> {
        // TODO: Remove comments
        // const stakingDeposits = await NearApiService.getStakingDeposits(this.getAddress(), this.baseApiUrl);
        // const validatorsProms = stakingDeposits.map(({ validatorId, amount }) => this.getValidatorDataFromId(validatorId, true, amount));
        // const validators = await Promise.all(validatorsProms);

        // TODO: remove get all validators line
        const validators = await this.getAllValidators();

        const stakingBalance: StakingBalance = {
            staked: validators.reduce((ant, act) => ant + (act.stakingBalance?.staked || 0), 0),
            available: validators.reduce((ant, act) => ant + (act.stakingBalance?.available || 0), 0),
            pending: validators.reduce((ant, act) => ant + (act.stakingBalance?.pending || 0), 0),
        };

        return stakingBalance;
    }

    // Amount is in near
    async depositAndStakeFromValidator(validatorId: string, amount: string): Promise<string> {
        const account = await this.getAccount();
        const amountInYocto = this.parseNearAmount(amount);

        const tx = await account.functionCall({
            contractId: validatorId,
            methodName: DEPOSIT_STAKE_METHOD,
            args: {},
            attachedDeposit: amountInYocto,
        });
        return tx.transaction_outcome.id;
    }

    // Amount is in near
    async unstakeFromValidator(validatorId: string, amount: string): Promise<string> {
        const account = await this.getAccount();
        const amountInYocto = this.parseNearAmount(amount);

        const tx = await account.functionCall({
            contractId: validatorId,
            methodName: UNSTAKE_METHOD,
            args: { amount: amountInYocto },
        });
        return tx.transaction_outcome.id;
    }

    async unstakeAllFromValidator(validatorId: string): Promise<string> {
        const account = await this.getAccount();

        const tx = await account.functionCall({
            contractId: validatorId,
            methodName: UNSTAKE_ALL_METHOD,
            args: {},
        });
        return tx.transaction_outcome.id;
    }

    // Amount is in near
    async withdrawFromValidator(validatorId: string, amount: string): Promise<string> {
        const account = await this.getAccount();
        const amountInYocto = this.parseNearAmount(amount);

        const tx = await account.functionCall({
            contractId: validatorId,
            methodName: WITHDRAW_METHOD,
            args: { amount: amountInYocto },
        });
        return tx.transaction_outcome.id;
    }

    async withdrawAllFromValidator(validatorId: string): Promise<string> {
        const account = await this.getAccount();

        const tx = await account.functionCall({
            contractId: validatorId,
            methodName: WITHDRAW_ALL_METHOD,
            args: {},
        });
        return tx.transaction_outcome.id;
    }

    // --------------------------------------------------------------
    // -- TOKENS FUNCTIONS ------------------------------------------
    // --------------------------------------------------------------
    private async isStorageBalanceAvailable(contractId: string, accountId: string): Promise<boolean> {
        const account = await this.getAccount();

        const storageBalance = await account.viewFunction({
            contractId,
            methodName: STORAGE_BALANCE_METHOD,
            args: { account_id: accountId },
        });
        return storageBalance?.total !== undefined;
    }

    private async transferStorageDeposit(contractId: string, receiverId: string): Promise<string> {
        const account = await this.getAccount();
        let tx: FinalExecutionOutcome;

        try {
            tx = await account.functionCall({
                contractId,
                methodName: STORAGE_DEPOSIT_METHOD,
                args: { account_id: receiverId, registration_only: true },
                gas: FT_STORAGE_DEPOSIT_GAS,
                attachedDeposit: FT_MINIMUM_STORAGE_BALANCE,
            });
        } catch (e: any) {
            if (e.message.includes("attached deposit is less than")) {
                tx = await account.functionCall({
                    contractId,
                    methodName: STORAGE_DEPOSIT_METHOD,
                    args: { account_id: receiverId, registration_only: true },
                    gas: FT_STORAGE_DEPOSIT_GAS,
                    attachedDeposit: FT_MINIMUM_STORAGE_BALANCE_LARGE,
                });
            } else {
                throw e;
            }
        }

        return tx.transaction_outcome.id;
    }

    async sendFungibleTokens(contractId: string, amount: number, receiverId: string, memo: string): Promise<string> {
        const account = await this.getAccount();

        const storageAvailable = await this.isStorageBalanceAvailable(contractId, receiverId);
        if (!storageAvailable) {
            await this.transferStorageDeposit(contractId, receiverId);
        }

        const tx = await account.functionCall({
            contractId,
            methodName: FT_TRANSFER_METHOD,
            args: { amount, memo, receiver_id: receiverId },
            gas: FT_TRANSFER_GAS,
            attachedDeposit: TOKEN_TRANSFER_DEPOSIT,
        });

        return tx.transaction_outcome.id;
    }

    async getTokenMetadata(contractId: string): Promise<TokenMetadata> {
        // TODO: Cache this call
        const account = await this.getAccount();
        return account.viewFunction({
            contractId,
            methodName: FT_METADATA_METHOD,
            args: {},
        });
    }

    async getTokenBalance(contractId: string): Promise<number> {
        // TODO: Cache this call
        const account = await this.getAccount();
        return account.viewFunction({
            contractId,
            methodName: FT_BALANCE_METHOD,
            args: { account_id: account.accountId },
        });
    }

    async getAccountTokens(): Promise<Token[]> {
        const contractIds = await NearApiService.getLikelyTokens(this.getAddress(), this.baseApiUrl);
        const tokens: Token[] = [];
        for (const contractId of contractIds) {
            const balance = await this.getTokenBalance(contractId);
            // TODO: Uncomment after testing
            // if (balance > 0) {
            //     const metadata = await this.getTokenMetadata(contractId);
            //     tokens.push({
            //         balance: balance / metadata.decimals,
            //         metadata,
            //     });
            // }

            // TODO: Remove next 4 lines after testing
            const metadata = await this.getTokenMetadata(contractId);
            tokens.push({
                balance: balance / metadata.decimals,
                metadata,
                contractId: contractId,
            });
        }

        return tokens;
    }

    // --------------------------------------------------------------
    // -- NFT FUNCTIONS ---------------------------------------------
    // --------------------------------------------------------------
    async sendNFT(contractId: string, tokenId: string, receiverId: string): Promise<string> {
        const account = await this.getAccount();

        const tx = await account.functionCall({
            contractId,
            methodName: NFT_TRANSFER_METHOD,
            args: { receiver_id: receiverId, token_id: tokenId },
            gas: NFT_TRANSFER_GAS,
            attachedDeposit: TOKEN_TRANSFER_DEPOSIT,
        });

        return tx.transaction_outcome.id;
    }

    // User has nfts of contract
    async getNftTokensAmount(contractId: string): Promise<number> {
        const account = await this.getAccount();
        return account.viewFunction({
            contractId,
            methodName: NFT_SUPPLY_METHOD,
            args: { account_id: account.accountId },
        });
    }

    async getNftMetadata(contractId: string): Promise<NftMetadata> {
        const account = await this.getAccount();
        return account.viewFunction({
            contractId,
            methodName: NFT_METADATA_METHOD,
            args: {},
        });
    }

    // Mintbase non-standard method
    private async getNftTokenMetadata(contractId: string, tokenId: string, baseUri: string): Promise<NftMetadata> {
        const account = await this.getAccount();
        let metadata = await account.viewFunction({
            contractId,
            methodName: NFT_TOKEN_METADATA_METHOD,
            args: { token_id: tokenId },
        });

        if (!metadata.media && metadata.reference) {
            metadata = await (await fetch(`${baseUri}/${metadata.reference}`)).json();
        }

        return metadata;
    }

    // Necessary for Mintbase nfts
    private async parseNftToken(token: any, contractId: string, baseUri: string | null): Promise<NftToken> {
        // Adapt for Mintbase NFTs
        if (token.id && !token.token_id) {
            token.token_id = token.id.toString();
            delete token.id;
        }

        if (token.owner_id && token.owner_id.Account) {
            token.owner_id = token.owner_id.Account;
        }

        if (!token.metadata || !token.metadata.media) {
            token.metadata = {
                ...token.metadata,
                ...(await this.getNftTokenMetadata(contractId, token.token_id, baseUri!)),
            };
        }

        const media = token.metadata.media;
        if (media && media.includes("://")) {
            token.metadata.media_url = media;
            token.metadata.media = null;
        }
        if (media && !media.includes("://") && !media.startsWith("data:image")) {
            const url = baseUri ? `${baseUri}/${media}` : `https://cloudflare-ipfs.com/ipfs/${media}`;
            token.metadata.media_url = url;
            token.metadata.media = null;
        }

        return token;
    }

    async getNftToken(contractId: string, tokenId: string, baseUri?: string): Promise<NftToken | null> {
        const account = await this.getAccount();
        const token = await account.viewFunction({
            contractId,
            methodName: NFT_TOKEN_METHOD,
            args: { token_id: tokenId },
        });

        if (!token) {
            return null;
        }

        return this.parseNftToken(token, contractId, baseUri || null);
    }

    async getNftTokens(contractId: string, baseUri: string | null, limit = 10): Promise<NftToken[]> {
        const account = await this.getAccount();
        let tokens: NftToken[] = [];

        try {
            const tokenIds = await account.viewFunction({
                contractId,
                methodName: NFT_OWNER_TOKENS_SET_METHOD,
                args: { account_id: account.accountId },
            });
            tokens = tokenIds.map(async (tokenId: number | string) => ({
                token_id: tokenId.toString(),
                owner_id: account.accountId,
                metadata: await this.getNftTokenMetadata(contractId, tokenId.toString(), baseUri!),
            }));
        } catch (err: any) {
            if (!err.toString().includes("FunctionCallError(MethodResolveError(MethodNotFound))")) {
                throw err;
            }

            tokens = await account.viewFunction({
                contractId,
                methodName: NFT_OWNER_TOKENS_METHOD,
                args: { account_id: account.accountId, from_index: "0", limit },
            });
        }

        const parsedTokens = tokens.map((token: any) => this.parseNftToken(token, contractId, baseUri));
        return Promise.all(parsedTokens);
    }

    async getNfts(): Promise<NftToken[]> {
        // TODO: remove mock
        return mockNfts;

        const contractIds = await NearApiService.getLikelyNfts(this.getAddress(), this.baseApiUrl);
        const nftTokens: NftToken[] = [];

        for (const contractId of contractIds) {
            const contractNfts = await this.getNftTokensAmount(contractId);

            if (contractNfts > 0) {
                const collectionMetadata = await this.getNftMetadata(contractId);
                const newNftTokens = await this.getNftTokens(contractId, collectionMetadata.base_uri);
                nftTokens.push(...newNftTokens.map((token: NftToken) => ({ ...token, collection_metadata: collectionMetadata })));
            }
        }

        return nftTokens;
    }
}
