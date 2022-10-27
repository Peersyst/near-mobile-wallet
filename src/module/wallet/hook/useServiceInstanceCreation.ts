import { serviceInstancesMap } from "module/wallet/state/WalletState";
import { WalletState } from "module/sdk";
import { Chains, NearSDKService } from "module/common/service/NearSdkService";
import { config } from "config";

const useServiceInstanceCreation = (): ((
    walletIndex: number,
    nameId: string,
    mnemonic: string[],
    testnetInitialState?: WalletState,
    mainnetInitialState?: WalletState,
) => Promise<void>) => {
    return async (index, nameId, mnemonic) => {
        if (!serviceInstancesMap.has(index)) {
            const stringMnemonic = mnemonic.join(" ");
            serviceInstancesMap.set(index, {
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

export default useServiceInstanceCreation;
