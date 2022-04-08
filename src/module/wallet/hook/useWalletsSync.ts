import { useSetRecoilState } from "recoil";
import walletState, { serviceInstancesMap } from "module/wallet/state/WalletState";
import useWalletState from "module/wallet/hook/useWalletState";

export type UseWalletSyncResult = () => Promise<void>;

export default function (): UseWalletSyncResult {
    const setWalletState = useSetRecoilState(walletState);
    const {
        state: { wallets },
    } = useWalletState();

    return async () => {
        for (let i = 0; i < wallets.length; i += 1) {
            const wallet = wallets[i];
            const newWalletState = await serviceInstancesMap.get(i)?.synchronize();
            if (newWalletState)
                setWalletState((state) => ({
                    ...state,
                    wallets: state.wallets.map((w) =>
                        w.index === wallet.index
                            ? {
                                  ...w,
                                  initialState: newWalletState,
                              }
                            : w,
                    ),
                }));
        }
    };
}
