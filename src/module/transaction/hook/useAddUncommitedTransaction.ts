import { WalletStorage } from "module/wallet/WalletStorage";
import { NetworkType } from "module/settings/state/SettingsState";
import useWalletState from "module/wallet/hook/useWalletState";
import useUpdateUncommittedTransactionsState from "./useUpdateUncommitedTransactionsState";

const useAddUncommittedTransaction = (): ((index: number, chain: NetworkType, hash: string) => Promise<void>) => {
    const {
        state: { wallets },
    } = useWalletState();
    const updateUncommitedTxsHashes = useUpdateUncommittedTransactionsState();

    return async (index, chain, hash) => {
        const uncommittedTransactionHashes = wallets[index]?.uncommittedTransactionHashes || [];
        updateUncommitedTxsHashes([...uncommittedTransactionHashes, hash], index);
        await WalletStorage.addUncommittedTransactionHash(index, chain, hash);
    };
};

export default useAddUncommittedTransaction;
