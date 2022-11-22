import { QueryResult } from "query-utils";
import { useQuery } from "react-query";
import useWallet from "module/wallet/hook/useWallet";
import { WalletStorage } from "module/wallet/WalletStorage";
import { useRef } from "react";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import { FullTransaction, TransactionStatus } from "near-peersyst-sdk";
import useUpdateUncommittedTransactions from "./useUpdateUncommitedTransactions";

const useUncommittedTransactions = (index?: number): QueryResult<FullTransaction[]> => {
    const { serviceInstance, index: usedIndex, network } = useServiceInstance(index);
    const wallet = useWallet(usedIndex);
    const { uncommittedTransactionHashes } = wallet[network] || {};
    /**
     * We need to use a ref here because the query will be re-run
     * and we don't want to remove the hashes from the storage on each re-run
     * but we want to display the rejected txs that we have uncommited in that session
     */
    const rejectedHashes: string[] = useRef([]).current;
    const updateUncommitedTxsHashes = useUpdateUncommittedTransactions(usedIndex);
    const removeUTxFromStorage = (hash: string): Promise<void> => {
        return WalletStorage.removeUncommittedTransactionHash(usedIndex, network, hash);
    };
    return useQuery(
        ["uncommittedTransactions", usedIndex, network, uncommittedTransactionHashes],
        async () => {
            /**
             * We have to check if the user has pending transactions that have been rejected/committed
             * - If it is still uncommitted add it to the list of the new uncommitted transactions
             * - If it is committed remove it from the list of new uncommitted transactions
             * - If it is rejected remove it from the list of new uncommitted transactions and add it to the list of rejected transactions
             *
             *  Each hash of the uncommited txs is stored in the storage. In the useLoad.ts we set the wallet state
             *  in which for each wallet it has the uncommited txs hashes.
             *  Check in WalletStorage.ts ( especially UnencryptedWalletChainInfo) to see how it is stored
             *  The uncommited txs hashes are stored in the useAddUncommittedTransaction
             */
            if (!uncommittedTransactionHashes) return [];

            const updatedUncommittedTransactionHashes: string[] = [];
            let shouldSync = false;
            const uncommittedTransactions: FullTransaction[] = [];

            for (const hash of uncommittedTransactionHashes) {
                try {
                    const tx = await serviceInstance.getTransaction(hash);
                    if (tx.status !== TransactionStatus.COMMITTED) {
                        uncommittedTransactions.push(tx);
                        updatedUncommittedTransactionHashes.push(hash);
                        // If rejected keep it in the list but remove it from storage in order to show it just in the current session
                        if (tx.status === TransactionStatus.REJECTED && !rejectedHashes.find((h) => h === hash)) {
                            await removeUTxFromStorage(hash);
                            rejectedHashes.push(hash);
                        }
                    } else {
                        // If committed remove it and sync in order to refresh data and refetch useGetTransactions
                        await removeUTxFromStorage(hash);
                        shouldSync = true;
                    }
                } catch {
                    await removeUTxFromStorage(hash);
                    rejectedHashes.push(hash);
                }
            }
            if (shouldSync) updateUncommitedTxsHashes(updatedUncommittedTransactionHashes);

            return uncommittedTransactions;
        },
        {
            refetchInterval: 15000,
        },
    );
};

export default useUncommittedTransactions;
