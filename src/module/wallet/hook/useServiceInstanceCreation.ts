import { serviceInstancesMap } from "module/wallet/state/WalletState";
import { WalletState } from "module/sdk";
import { Chains, NearSDKService } from "module/common/service/NearSdkService";
import { config } from "config";

interface UseServiceInstanceCreationBaseParams {
    walletIndex: number;
    nameId: string;
    testnetInitialState?: WalletState;
    mainnetInitialState?: WalletState;
}

interface UseServiceInstanceCreationByMnemonicParams extends UseServiceInstanceCreationBaseParams {
    mnemonic: string[];
}

interface UseServiceInstanceCreationBySecretParams extends UseServiceInstanceCreationBaseParams {
    secret: string;
}

interface CreateNearServiceParams {
    chain: Chains;
    secretKey: string;
    nameId: string;
    mnemonic?: string;
}

function createNearService({ chain, secretKey, nameId, mnemonic }: CreateNearServiceParams) {
    return new NearSDKService(
        chain,
        chain === Chains.TESTNET ? config.indexerTestnetUrl : config.indexerMainnetUrl,
        chain === Chains.TESTNET ? config.testnetExplorerApi : config.mainnetExplorerApi,
        secretKey,
        nameId,
        mnemonic,
    );
}

export const useServiceInstanceCreationByMnemonic = (): ((params: UseServiceInstanceCreationByMnemonicParams) => Promise<void>) => {
    return async ({ walletIndex, nameId, mnemonic }) => {
        if (!serviceInstancesMap.has(walletIndex)) {
            const stringMnemonic = mnemonic.join(" ");
            serviceInstancesMap.set(walletIndex, {
                testnet: createNearService({ mnemonic: stringMnemonic, chain: Chains.TESTNET, nameId, secretKey: stringMnemonic }),
                mainnet: createNearService({ mnemonic: stringMnemonic, chain: Chains.TESTNET, nameId, secretKey: stringMnemonic }),
            });
        }
    };
};

export const useServiceInstanceCreationBySecret = (): ((params: UseServiceInstanceCreationBySecretParams) => Promise<void>) => {
    return async ({ walletIndex, nameId, secret }) => {
        if (!serviceInstancesMap.has(walletIndex)) {
            serviceInstancesMap.set(walletIndex, {
                testnet: new NearSDKService(
                    Chains.TESTNET,
                    config.indexerTestnetUrl,
                    config.testnetExplorerApi,
                    "secretKey",
                    nameId,
                    stringMnemonic,
                ),
                mainnet: new NearSDKService(
                    Chains.MAINNET,
                    config.indexerMainnetUrl,
                    config.mainnetExplorerApi,
                    "secretKey",
                    nameId,
                    stringMnemonic,
                ),
            });
        }
    };
};
