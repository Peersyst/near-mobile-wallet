// import { useSetRecoilState } from "recoil";
// import walletState, { serviceInstancesMap } from "module/wallet/state/WalletState";
import { serviceInstancesMap } from "module/wallet/state/WalletState";

export type UseWalletSyncResult = (index: number) => Promise<void>;

export default function (): UseWalletSyncResult {
    // const setWalletState = useSetRecoilState(walletState);

    return async (index: number) => {
        await serviceInstancesMap.get(index)?.synchronize();
        // Should not be necessary as we have onSync
        // if (newWalletState)
        //     setWalletState((state) => ({
        //         ...state,
        //         wallets: state.wallets.map((w) =>
        //             w.index === index
        //                 ? {
        //                       ...w,
        //                       initialState: newWalletState,
        //                   }
        //                 : w,
        //         ),
        //     }));
    };
}
