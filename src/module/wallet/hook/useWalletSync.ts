import { useSetRecoilState } from "recoil";
import walletState, { serviceInstancesMap } from "module/wallet/state/WalletState";

export type UseWalletSyncResult = (index: number) => Promise<void>;

export default function (): UseWalletSyncResult {
    const setWalletState = useSetRecoilState(walletState);

    return async (index: number) => {
        const newWalletState = await serviceInstancesMap.get(index)?.synchronize();
        if (newWalletState)
            setWalletState((state) => ({
                ...state,
                wallets: state.wallets.map((w) =>
                    w.index === index
                        ? {
                              ...w,
                              initialState: newWalletState,
                          }
                        : w,
                ),
            }));
    };
}
