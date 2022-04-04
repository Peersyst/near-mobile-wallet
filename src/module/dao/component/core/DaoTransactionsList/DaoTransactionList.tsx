import { translate } from "locale";
import MainList from "module/main/component/display/MainList/MainList";
import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import useGetDaoTransactions from "module/dao/query/useGetDaoTransactions";
import TransactionCard from "module/transaction/component/display/TransactionCard/TransactionCard";

const DaoTransactionsList = (): JSX.Element => {
    const { data = [], refetch, isLoading } = useGetDaoTransactions();
    return (
        <MainList
            onRefresh={refetch}
            loading={isLoading}
            data={data}
            ListEmptyComponent={isLoading ? undefined : <EmptyListComponent message={translate("no_transactions")} />}
            renderItem={({ item: tx }) => <TransactionCard transaction={tx} />}
            keyExtractor={(tx) => tx.transactionHash}
        />
    );
};

export default DaoTransactionsList;
