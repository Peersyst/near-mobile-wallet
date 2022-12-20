import { useQuery } from "react-query";
import useUncommittedTransactions from "module/transaction/query/useUncommittedTransactions";
import { useMemo } from "react";
import useServiceInstance from "module/wallet/hook/useServiceInstance";

export interface UseGetTransactionsOptions {
    /**
     * Index of the wallet to use
     */
    index?: number;
}

const useGetTransactions = ({ index }: UseGetTransactionsOptions = {}) => {
    const { serviceInstance, index: usedIndex, network } = useServiceInstance(index);
    //const { data: uncommitedTransactions = [], isLoading: uncommitedTransactionsLoading } = useUncommittedTransactions(usedIndex);
    const { data: transactions = [], isLoading: transactionsLoading } = useQuery(["transactions", usedIndex, network], async () => {
        try {
            const txs = await serviceInstance?.getTransactions();
            return txs;
        } catch (e) {
            return [];
        }
    });

    return {
        data: transactions,
        isLoading: transactionsLoading,
    };
};

export default useGetTransactions;
