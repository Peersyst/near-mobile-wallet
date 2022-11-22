import { WalletStorage } from "module/wallet/WalletStorage";
import { NetworkType } from "module/settings/state/SettingsState";
import useWalletState from "module/wallet/hook/useWalletState";
import useUpdateUncommittedTransactions from "../query/useUpdateUncommitedTransactions";

const useAddUncommittedTransaction = (): ((index: number, chain: NetworkType, hash: string) => Promise<void>) => {
    const {
        state: { wallets },
    } = useWalletState();
    const updateUnCommitedTxsHashes = useUpdateUncommittedTransactions();

    return async (index, chain, hash) => {
        const uncommittedTransactionHashes = wallets[index][chain]?.uncommittedTransactionHashes || [];
        updateUnCommitedTxsHashes([...uncommittedTransactionHashes, hash], index);
        await WalletStorage.addUncommittedTransactionHash(index, chain, hash);
    };
};

export default useAddUncommittedTransaction;
