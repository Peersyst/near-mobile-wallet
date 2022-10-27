import { serviceInstancesMap } from "module/wallet/state/WalletState";
import { Chains, NearSDKService } from "module/common/service/NearSdkService";
import { config } from "config";

export interface UseServiceInstanceCreationBaseParams {
    walletIndex: number;
    nameId: string;
}

export interface UseServiceInstanceCreationByMnemonicParams extends UseServiceInstanceCreationBaseParams {
    mnemonic: string[];
}

export interface UseServiceInstanceCreationBySecretParams extends UseServiceInstanceCreationBaseParams {
    secretKey: string;
}

export interface CreateNearServiceParams {
    chain: Chains;
    secretKey: string;
    nameId: string;
    mnemonic?: string;
}

export interface CreateServiceInstanceParams extends UseServiceInstanceCreationBaseParams {
    mnemonic?: string[];
    secretKey?: string;
    walletIndex: number;
}

const serviceInstanceCreation = async ({ walletIndex, nameId, mnemonic, secretKey }: CreateServiceInstanceParams) => {
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

export default serviceInstanceCreation;
