import { serviceInstancesMap } from "module/wallet/state/WalletState";
import { Chains, NearSDKService } from "module/common/service/NearSdkService";
import { config } from "config";

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
    nameId: string;
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
                    nameId,
                ),
                mainnet: await NearSDKService.importFromMnemonic(
                    Chains.MAINNET,
                    config.mainnetNodeUrl,
                    config.indexerMainnetUrl,
                    stringMnemonic,
                    nameId,
                ),
            });
        }
        if (secretKey) {
            serviceInstancesMap.set(walletIndex, {
                testnet: await NearSDKService.importFromSecretKey(
                    Chains.TESTNET,
                    config.testnetNodeUrl,
                    config.indexerTestnetUrl,
                    secretKey,
                    nameId,
                ),
                mainnet: await NearSDKService.importFromSecretKey(
                    Chains.MAINNET,
                    config.mainnetNodeUrl,
                    config.indexerMainnetUrl,
                    secretKey,
                    nameId,
                ),
            });
        }
    }
};

export default createServiceInstance;
