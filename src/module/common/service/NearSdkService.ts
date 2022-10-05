import { connect, keyStores, utils, Near, ConnectConfig, KeyPair, Account } from "near-api-js";
import { AccountBalance, AccountAuthorizedApp } from "near-api-js/lib/account";
const { parseSeedPhrase, generateSeedPhrase } = require("near-seed-phrase");

export enum Chains {
    MAINNET = "mainnet",
    TESTNET = "testnet",
    BETANET = "betanet",
    LOCAL = "local",
}

export class NearSDKService {
    private connection?: Near;
    private nearConfig: ConnectConfig;
    private mnemonic: string;
    private nameId: string;

    constructor(chain: Chains, nameId: string, nodeUrl: string, mnemonic?: string) {
        this.nameId = nameId;
        let keyPair: KeyPair;

        if (mnemonic) {
            this.mnemonic = mnemonic;
            const { secretKey } = parseSeedPhrase(mnemonic);
            keyPair = utils.KeyPair.fromString(secretKey);
        } else {
            const { seedPhrase, secretKey } = generateSeedPhrase();
            this.mnemonic = seedPhrase;
            keyPair = utils.KeyPair.fromString(secretKey);
        }

        const keyStore = new keyStores.InMemoryKeyStore();
        keyStore.setKey(chain, nameId, keyPair);

        this.nearConfig = {
            networkId: chain,
            keyStore,
            nodeUrl,
        };
    }

    private async getAccount(): Promise<Account> {
        if (!this.connection) {
            throw new Error("Not connected");
        }
        return this.connection.account(this.nameId);
    }

    async connect(): Promise<void> {
        this.connection = await connect(this.nearConfig);
    }

    async getAccountBalance(): Promise<AccountBalance> {
        const account = await this.getAccount();
        return account.getAccountBalance();
    }

    async getAccountDetails(): Promise<AccountAuthorizedApp[]> {
        const account = await this.getAccount();
        const { authorizedApps } = await account.getAccountDetails();
        return authorizedApps;
    }

    static async createAndConnect(chain: Chains, nameId: string, mnemonic: string): Promise<NearSDKService> {
        const service = new NearSDKService(chain, nameId, mnemonic);
        await service.connect();
        return service;
    }
}
