import { connect, keyStores, utils, Near, ConnectConfig, KeyPair } from "near-api-js";
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

    constructor(chain: Chains, nameId: string, nodeUrl: string, mnemonic?: string) {
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

    async connect(): Promise<void> {
        this.connection = await connect(this.nearConfig);
    }

    static async createAndConnect(chain: Chains, nameId: string, nodeUrl: string, mnemonic?: string): Promise<NearSDKService> {
        const service = new NearSDKService(chain, nameId, nodeUrl, mnemonic);
        await service.connect();
        return service;
    }
}
