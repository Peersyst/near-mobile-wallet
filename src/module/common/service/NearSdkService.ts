import { connect, keyStores, utils, Near, ConnectConfig, KeyPair, Account } from "near-api-js";
import { AccountBalance } from "near-api-js/lib/account";
import { AccountView, FinalExecutionOutcome } from "near-api-js/lib/providers/provider";
const { parseSeedPhrase, generateSeedPhrase } = require("near-seed-phrase");
import { decode, encode } from "bs58";

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

    async getAccountBalance(): Promise<AccountBalance> {
        const account = await this.getAccount();
        return account.getAccountBalance();
    }

    async getAccountState(): Promise<AccountView> {
        const account = await this.getAccount();
        return account.state();
    }

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
}
