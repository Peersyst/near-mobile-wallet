import { WalletStorage } from "module/wallet/WalletStorage";
import { useSetRecoilState } from "recoil";
import walletState from "module/wallet/state/WalletState";
import { NetworkType } from "module/settings/state/SettingsState";

const useAddUncommittedTransaction = (): ((index: number, chain: NetworkType, hash: string) => Promise<void>) => {
    const setWalletState = useSetRecoilState(walletState);

    return async (index, chain, hash) => {
        setWalletState((state) => ({
            ...state,
            wallets: state.wallets.map((w) => {
                if (w.index !== index) return w;
                else {
                    const networkInfo = w[chain];
                    const uncommittedTransactionHashes = w?.[chain]?.uncommittedTransactionHashes || [];
                    return {
                        ...w,
                        [chain]: {
                            ...networkInfo,
                            uncommittedTransactionHashes: [...uncommittedTransactionHashes, hash],
                        },
                    };
                }
            }),
        }));
        await WalletStorage.addUncommittedTransactionHash(index, chain, hash);
    };
};

export default useAddUncommittedTransaction;
