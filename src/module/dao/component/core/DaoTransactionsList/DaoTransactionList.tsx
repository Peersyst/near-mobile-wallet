import { translate } from "locale";
import MainList from "module/main/component/display/MainList/MainList";
import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import TransactionCard from "module/transaction/component/display/TransactionCard/TransactionCard";
import useGetTransactions from "module/transaction/query/useGetTransactions";
import { isDaoTx } from "module/transaction/component/utils/isDaoTransaction";

const DaoTransactionsList = (): JSX.Element => {
    const { data = [], refetch, isLoading } = useGetTransactions();
    return (
        <MainList
            onRefresh={refetch}
            loading={isLoading}
            data={data.filter((tx) => isDaoTx(tx.type))}
            ListEmptyComponent={isLoading ? undefined : <EmptyListComponent message={translate("no_transactions")} />}
            renderItem={({ item: tx }) => <TransactionCard transaction={tx} />}
            keyExtractor={(_, index) => index.toString()}
        />
    );
};

export default DaoTransactionsList;
