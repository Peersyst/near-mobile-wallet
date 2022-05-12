import walletState, { serviceInstancesMap } from "module/wallet/state/WalletState";
import { CKBSDKService } from "module/common/service/CkbSdkService";
import { WalletState } from "module/sdk";
import { WalletStorage } from "module/wallet/WalletStorage";
import { useSetRecoilState } from "recoil";
import useWalletQueriesInvalidation from "module/wallet/hook/useWalletQueriesInvalidation";
import { notificationAsync, NotificationFeedbackType } from "expo-haptics";

const useServiceInstanceCreation = (): ((walletIndex: number, mnemonic: string[], initialState?: WalletState) => Promise<void>) => {
    const setWalletState = useSetRecoilState(walletState);
    const invalidateWalletQueries = useWalletQueriesInvalidation();

    return async (index, mnemonic, initialState) => {
        if (!serviceInstancesMap.has(index)) {
            serviceInstancesMap.set(
                index,
                new CKBSDKService(
                    mnemonic.join(" "),
                    initialState,
                    async (walletState: WalletState) => {
                        await WalletStorage.setInitialState(index, walletState);
                        setWalletState((state) => ({
                            ...state,
                            wallets: state.wallets.map((w) =>
                                w.index === index ? { ...w, initialState: walletState, synchronizing: false } : w,
                            ),
                        }));
                        await invalidateWalletQueries(index);
                        if (index === serviceInstancesMap.size - 1) notificationAsync(NotificationFeedbackType.Warning);
                    },
                    () => {
                        setWalletState((state) => ({
                            ...state,
                            wallets: state.wallets.map((w) => (w.index === index ? { ...w, synchronizing: true } : w)),
                        }));
                    },
                ),
            );
        }
    };
};

export default useServiceInstanceCreation;
