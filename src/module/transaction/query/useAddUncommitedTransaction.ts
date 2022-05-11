import { WalletStorage } from "module/wallet/WalletStorage";
import { useSetRecoilState } from "recoil";
import walletState from "module/wallet/state/WalletState";

const useAddUncommittedTransaction = (): ((index: number, hash: string) => Promise<void>) => {
    const setWalletState = useSetRecoilState(walletState);

    return async (index, hash) => {
        setWalletState((state) => ({
            ...state,
            wallets: state.wallets.map((w) =>
                w.index === index
                    ? {
                          ...w,
                          uncommittedTransactionHashes: [...(w.uncommittedTransactionHashes || []), hash],
                      }
                    : w,
            ),
        }));
        await WalletStorage.addUncommittedTransactionHash(index, hash);
    };
};

export default useAddUncommittedTransaction;
