import { useQuery } from "react-query";
import useUncommittedTransactions from "module/transaction/query/useUncommittedTransactions";
import { FullTransaction } from "module/common/service/CkbSdkService.types";
import { useMemo } from "react";
import useServiceInstance from "module/wallet/hook/useServiceInstance";

export interface UseGetTransactionsOptions {
    index?: number;
    filter?: (tx: FullTransaction) => boolean;
}

const useGetTransactions = ({ index, filter }: UseGetTransactionsOptions = {}) => {
    const { serviceInstance, index: usedIndex, network } = useServiceInstance(index);
    const { data: uncommitedTransactions = [], isLoading: uncommitedTransactionsLoading } = useUncommittedTransactions(usedIndex);

    const { data: transactions = [], isLoading: transactionsLoading } = useQuery(["transactions", usedIndex, network], async () => {
        const tsx = (await serviceInstance?.getTransactions()) as FullTransaction[];
        return tsx.reverse();
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
        isLoading: uncommitedTransactionsLoading || transactionsLoading,
    };
};

export default useGetTransactions;
