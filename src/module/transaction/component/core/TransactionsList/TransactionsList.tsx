import TransactionCard from "module/transaction/component/display/TransactionCard/TransactionCard";
import useGetTransactions from "module/transaction/query/useGetTransactions";
import { translate } from "locale";
import MainList from "module/main/component/display/MainList/MainList";
import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import useSelectedWallet from "module/wallet/hook/useSelectedWallet";

const TransactionsList = (): JSX.Element => {
    const { index } = useSelectedWallet();

    const { data = [], refetch, isLoading } = useGetTransactions(index);

    return (
        <MainList
            onRefresh={refetch}
            loading={isLoading}
            data={data}
            ListEmptyComponent={isLoading ? undefined : <EmptyListComponent message={translate("no_transactions")} />}
            renderItem={({ item: tx }) => <TransactionCard {...tx} />}
            keyExtractor={(tx) => tx.transactionHash}
        />
    );
};

export default TransactionsList;
