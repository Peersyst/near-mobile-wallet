import { useQuery } from "react-query";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import useSelectedWalletIndex from "module/wallet/hook/useSelectedWalletIndex";
import useUncommittedTransactions from "module/transaction/query/useUncommittedTransactions";
import { FullTransaction } from "module/common/service/CkbSdkService.types";
import { useMemo } from "react";

export interface UseGetTransactionsOptions {
    index?: number;
    filter?: (tx: FullTransaction) => boolean;
}

const useGetTransactions = ({ index, filter }: UseGetTransactionsOptions = {}) => {
    const selectedWallet = useSelectedWalletIndex();
    const usedIndex = index ?? selectedWallet;
    const {
        data: uncommitedTransactions = [],
        refetch: refetchUncommitedTransactions,
        isLoading: uncommitedTransactionsLoading,
    } = useUncommittedTransactions(usedIndex);
    const {
        data: transactions = [],
        refetch: refetchTransactions,
        isLoading: transactionsLoading,
    } = useQuery(["transactions", usedIndex], () => {
        const serviceInstance = serviceInstancesMap.get(usedIndex);
        return serviceInstance?.getTransactions().reverse();
    });

    const txs = useMemo(() => {
        const filteredTransacations = transactions.filter(
            (tx) => !uncommitedTransactions.find((uTx) => tx.transactionHash === uTx.transactionHash),
        );
        return filter
            ? [...uncommitedTransactions, ...filteredTransacations].filter(filter)
            : [...uncommitedTransactions, ...filteredTransacations];
    }, [uncommitedTransactions, transactions, filter]);

    return {
        data: txs,
        refetch: async () => Promise.all([refetchUncommitedTransactions(), refetchTransactions()]),
        isLoading: uncommitedTransactionsLoading || transactionsLoading,
    };
};

export default useGetTransactions;
