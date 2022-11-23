import { useQuery } from "react-query";
import useUncommittedTransactions from "module/transaction/query/useUncommittedTransactions";
import { useMemo } from "react";
import useServiceInstance from "module/wallet/hook/useServiceInstance";

export interface UseGetTransactionsOptions {
    index?: number;
    filter?: (tx: any) => boolean; //TODO: add type
}

const useGetTransactions = ({ index, filter }: UseGetTransactionsOptions = {}) => {
    const { serviceInstance, index: usedIndex, network } = useServiceInstance(index);
    const { data: uncommitedTransactions = [], isLoading: uncommitedTransactionsLoading } = useUncommittedTransactions(usedIndex);

    const { data: transactions = [], isLoading: transactionsLoading } = useQuery(["transactions", usedIndex, network], async () => {
        return (await serviceInstance?.getTransactions())?.reverse();
    });

    const txs = useMemo(() => {
        const filteredTransacations = transactions.filter(
            (tx: any) => !uncommitedTransactions.find((uTx) => tx.transactionHash === uTx.transactionHash),
        ); //ADD type
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
