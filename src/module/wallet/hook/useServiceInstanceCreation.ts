import walletState, { serviceInstancesMap } from "module/wallet/state/WalletState";
import { CKBSDKService } from "module/common/service/CkbSdkService";
import { WalletState } from "module/sdk";
import { WalletStorage } from "module/wallet/WalletStorage";
import { useSetRecoilState } from "recoil";
import { useQueryClient } from "react-query";

const useServiceInstanceCreation = (): ((walletIndex: number, mnemonic: string[], initialState?: WalletState) => Promise<void>) => {
    const setWalletState = useSetRecoilState(walletState);
    const queryClient = useQueryClient();

    return async (index, mnemonic, initialState) => {
        if (!serviceInstancesMap.has(index)) {
            serviceInstancesMap.set(
                index,
                new CKBSDKService(
                    mnemonic.join(" "),
                    initialState,
                    async (walletState: WalletState) => {
                        queryClient.invalidateQueries(["transactions", index], { refetchInactive: true, exact: true });
                        queryClient.invalidateQueries(["tokens", index], { refetchInactive: true, exact: true });
                        queryClient.invalidateQueries(["nfts", index], { refetchInactive: true, exact: true });
                        await WalletStorage.setInitialState(index, walletState);
                        setWalletState((state) => ({
                            ...state,
                            wallets: state.wallets.map((w) =>
                                w.index === index ? { ...w, initialState: walletState, synchronizing: false } : w,
                            ),
                        }));
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
