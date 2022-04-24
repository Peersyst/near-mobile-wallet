// import { useSetRecoilState } from "recoil";
// import walletState, { serviceInstancesMap } from "module/wallet/state/WalletState";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import useWalletState from "module/wallet/hook/useWalletState";

export type UseWalletSyncResult = () => Promise<void>;

export default function (): UseWalletSyncResult {
    // const setWalletState = useSetRecoilState(walletState);
    const {
        state: { wallets },
    } = useWalletState();

    return async () => {
        for (let i = 0; i < wallets.length; i += 1) {
            await serviceInstancesMap.get(i)?.synchronize();

            // const wallet = wallets[i];
            // const newWalletState = await serviceInstancesMap.get(i)?.synchronize();
            // TODO: As we now have on sync the next lines should not be necessary
            // if (newWalletState)
            //     setWalletState((state) => ({
            //         ...state,
            //         wallets: state.wallets.map((w) =>
            //             w.index === wallet.index
            //                 ? {
            //                       ...w,
            //                       initialState: newWalletState,
            //                   }
            //                 : w,
            //         ),
            //     }));
        }
    };
}
