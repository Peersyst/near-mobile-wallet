import { connect, keyStores, utils, Near, ConnectConfig, KeyPair, Account } from "near-api-js";
import { AccountBalance } from "near-api-js/lib/account";
import { AccountView, FinalExecutionOutcome } from "near-api-js/lib/providers/provider";
const { parseSeedPhrase, generateSeedPhrase } = require("near-seed-phrase");
import { decode, encode } from "bs58";
import {
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
} from "./near.constants";

export enum Chains {
    MAINNET = "mainnet",
    TESTNET = "testnet",
    BETANET = "betanet",
    LOCAL = "local",
}

export class NearSDKService {
    private connection?: Near;
    private nearConfig: ConnectConfig;
    private mnemonic?: string;
    private nameId: string;
    private keyPair: KeyPair;
    private tempNameId?: string;

    constructor(chain: Chains, nodeUrl: string, secretKey: string, nameId: string, mnemonic?: string) {
        this.nameId = nameId;
        this.mnemonic = mnemonic;

        this.keyPair = KeyPair.fromString(secretKey);
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
    static async createAndConnect(chain: Chains, nodeUrl: string, nameId: string): Promise<NearSDKService> {
        const { seedPhrase, secretKey } = generateSeedPhrase();
        const service = new NearSDKService(chain, nodeUrl, secretKey, nameId, seedPhrase);
        await service.connect();
        return service;
    }

    static async importFromMnemonic(chain: Chains, nodeUrl: string, mnemonic: string, nameId: string): Promise<NearSDKService> {
        const { secretKey } = parseSeedPhrase(mnemonic);
        const service = new NearSDKService(chain, nodeUrl, secretKey, nameId, mnemonic);
        await service.connect();
        return service;
    }

    static async importFromSecretKey(chain: Chains, nodeUrl: string, secretKey: string, nameId: string): Promise<NearSDKService> {
        const service = new NearSDKService(chain, nodeUrl, secretKey, nameId);
        await service.connect();
        return service;
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
        // Need indexer!
        // Check if this.nameId has as access key the public key
        // If true return this.nameId, else return public key to address
        return decode(encode(this.keyPair.getPublicKey().data)).toString("hex");
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
            if (e.type === "AccountDoesNotExist") {
                exists = false;
            }
        }

        return exists;
    }

    // --------------------------------------------------------------
    // -- WALLET STATE FUNCTIONS ------------------------------------
    // --------------------------------------------------------------
    async getAccountBalance(): Promise<AccountBalance> {
        const account = await this.getAccount();
        return account.getAccountBalance();
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
        const amountInYocto = utils.format.parseNearAmount(amount);

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

    // --------------------------------------------------------------
    // -- STAKING FUNCTIONS -----------------------------------------
    // --------------------------------------------------------------
    // Amount is in near
    // Staking without validator
    async stake(amount: string): Promise<string> {
        const account = await this.getAccount();
        const amountInYocto = utils.format.parseNearAmount(amount);

        const tx = await account.stake(this.keyPair.getPublicKey(), amountInYocto);
        return tx.transaction_outcome.id;
    }

    // --------------------------------------------------------------
    // -- TOKENS FUNCTIONS ------------------------------------------
    // --------------------------------------------------------------
    private async isStorageBalanceAvailable(contractId: string, accountId: string): Promise<boolean> {
        const account = await this.getAccount();

        const storageBalance = await account.viewFunction(contractId, STORAGE_BALANCE_METHOD, { account_id: accountId });
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
}
