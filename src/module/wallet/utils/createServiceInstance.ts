import { serviceInstancesMap } from "module/wallet/state/WalletState";
import { config } from "config";
import { Chains, NearSDKService } from "near-peersyst-sdk";

export interface CreateServiceInstanceBaseParams {
    walletIndex: number;
    nameId: string;
}

export interface CreateServiceInstanceByMnemonicParams extends CreateServiceInstanceBaseParams {
    mnemonic: string[];
}

export interface CreateServiceInstanceBySecretParams extends CreateServiceInstanceBaseParams {
    secretKey: string;
}

export interface CreateNearServiceParams {
    chain: Chains;
    secretKey: string;
    nameId?: string;
    mnemonic?: string;
}

export interface CreateServiceInstanceParams extends CreateServiceInstanceBaseParams {
    mnemonic?: string[];
    secretKey?: string;
    walletIndex: number;
}

const createServiceInstance = async ({ walletIndex, nameId, mnemonic, secretKey }: CreateServiceInstanceParams) => {
    if (!serviceInstancesMap.has(walletIndex)) {
        if (mnemonic) {
            const stringMnemonic = mnemonic?.join(" ");
            serviceInstancesMap.set(walletIndex, {
                testnet: await NearSDKService.importFromMnemonic(
                    Chains.TESTNET,
                    config.testnetNodeUrl,
                    config.indexerTestnetUrl,
                    stringMnemonic,
                    "doctorparra.near",
                ),
                mainnet: await NearSDKService.importFromMnemonic(
                    Chains.MAINNET,
                    config.mainnetNodeUrl,
                    config.indexerMainnetUrl,
                    stringMnemonic,
                    "doctorparra.near",
                ),
            });
        } else if (secretKey) {
            serviceInstancesMap.set(walletIndex, {
                testnet: await NearSDKService.importFromSecretKey(
                    Chains.TESTNET,
                    config.testnetNodeUrl,
                    config.indexerTestnetUrl,
                    secretKey,
                    "doctorparra.near",
                ),
                mainnet: await NearSDKService.importFromSecretKey(
                    Chains.MAINNET,
                    config.mainnetNodeUrl,
                    config.indexerMainnetUrl,
                    secretKey,
                    "doctorparra.near",
                ),
            });
        }
    }
};

export default createServiceInstance;
