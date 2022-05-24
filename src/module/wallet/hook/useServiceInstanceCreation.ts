import walletState, { serviceInstancesMap } from "module/wallet/state/WalletState";
import { CKBSDKService } from "module/common/service/CkbSdkService";
import { WalletState } from "module/sdk";
import { WalletStorage } from "module/wallet/WalletStorage";
import { useSetRecoilState } from "recoil";
import useWalletQueriesInvalidation from "module/wallet/hook/useWalletQueriesInvalidation";
import { Chain } from "module/common/service/CkbSdkService.types";

const useServiceInstanceCreation = (): ((
    walletIndex: number,
    mnemonic: string[],
    testnetInitialState?: WalletState,
    mainnetInitialState?: WalletState,
) => Promise<void>) => {
    const setWalletState = useSetRecoilState(walletState);
    const invalidateWalletQueries = useWalletQueriesInvalidation();

    return async (index, mnemonic, testnetInitialState, mainnetInitialState) => {
        if (!serviceInstancesMap.has(index)) {
            const stringMnemonic = mnemonic.join(" ");
            const onSync = async (chain: Chain, walletState: WalletState) => {
                await WalletStorage.setInitialState(index, chain, walletState);
                await invalidateWalletQueries(index, chain);
                setWalletState((state) => ({
                    ...state,
                    wallets: state.wallets.map((w) => (w.index === index ? { ...w, initialState: walletState, synchronizing: false } : w)),
                }));
            };
            const onSyncStart = () => {
                setWalletState((state) => ({
                    ...state,
                    wallets: state.wallets.map((w) => (w.index === index ? { ...w, synchronizing: true } : w)),
                }));
            };
            serviceInstancesMap.set(index, {
                testnet: new CKBSDKService(
                    "testnet",
                    stringMnemonic,
                    testnetInitialState,
                    (walletState) => onSync("testnet", walletState),
                    onSyncStart,
                ),
                mainnet: new CKBSDKService(
                    "mainnet",
                    stringMnemonic,
                    mainnetInitialState,
                    (walletState) => onSync("mainnet", walletState),
                    onSyncStart,
                ),
            });
        }
    };
};

export default useServiceInstanceCreation;
