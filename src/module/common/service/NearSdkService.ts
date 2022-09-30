import { connect, keyStores, utils, Near, ConnectConfig, KeyPair } from "near-api-js";
import { config } from "config";
/// const { parseSeedPhrase, generateSeedPhrase } = require("near-seed-phrase");

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

    constructor(chain: Chains, nameId: string, mnemonic?: string) {
        let keyPair: KeyPair;

        if (mnemonic) {
            this.mnemonic = mnemonic;
            // const { secretKey } = parseSeedPhrase(mnemonic);
            const secretKey = this.mnemonic;
            keyPair = utils.KeyPair.fromString(secretKey);
        } else {
            // const { seedPhrase, secretKey } = generateSeedPhrase();
            // this.mnemonic = seedPhrase;
            this.mnemonic = "hola";
            const secretKey = this.mnemonic;
            keyPair = utils.KeyPair.fromString(secretKey);
        }

        const keyStore = new keyStores.InMemoryKeyStore();
        keyStore.setKey(chain, nameId, keyPair);

        if (chain === Chains.MAINNET) {
            this.nearConfig = {
                networkId: chain,
                keyStore,
                nodeUrl: config.nearMainnetUrl,
            };
        } else if (chain === Chains.TESTNET) {
            this.nearConfig = {
                networkId: chain,
                keyStore,
                nodeUrl: config.nearTestnetUrl,
            };
        } else {
            throw new Error("Chain not implemented yet");
        }
    }

    async connect(): Promise<void> {
        this.connection = await connect(this.nearConfig);
    }

    static async createAndConnect(chain: Chains, nameId: string, mnemonic: string): Promise<NearSDKService> {
        const service = new NearSDKService(chain, nameId, mnemonic);
        await service.connect();
        return service;
    }
}
