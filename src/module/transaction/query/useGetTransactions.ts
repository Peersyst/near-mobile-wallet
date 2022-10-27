import { useQuery } from "react-query";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import useSelectedWalletIndex from "module/wallet/hook/useSelectedWalletIndex";
import useUncommittedTransactions from "module/transaction/query/useUncommittedTransactions";
import { FullTransaction } from "module/common/service/CkbSdkService.types";
import { useMemo } from "react";
import useSelectedNetwork from "module/settings/hook/useSelectedNetwork";

export interface UseGetTransactionsOptions {
    index?: number;
    filter?: (tx: FullTransaction) => boolean;
}

const useGetTransactions = ({ index, filter }: UseGetTransactionsOptions = {}) => {
    const network = useSelectedNetwork();
    const selectedWallet = useSelectedWalletIndex();
    const usedIndex = index ?? selectedWallet;
    const { data: uncommitedTransactions = [], isLoading: uncommitedTransactionsLoading } = useUncommittedTransactions(usedIndex);
    const { data: transactions = [], isLoading: transactionsLoading } = useQuery(["transactions", usedIndex, network], async () => {
        const serviceInstance = serviceInstancesMap.get(usedIndex)?.[network];
        const tx = (await serviceInstance?.getTransactions()) as FullTransaction[];
        return tx.reverse();
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
