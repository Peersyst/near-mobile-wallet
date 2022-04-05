import useGetTransactions from "module/transaction/query/useGetTransactions";
import { translate } from "locale";
import MainList from "module/main/component/display/MainList/MainList";
import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import TransactionCard from "module/transaction/component/display/TransactionCard/TransactionCard";
import { isDaoTx } from "../../utils/isDaoTransaction";

const TransactionsList = (): JSX.Element => {
    const { data = [], refetch, isLoading } = useGetTransactions();
    return (
        <MainList
            onRefresh={refetch}
            loading={isLoading}
            data={data.filter((tx) => !isDaoTx(tx.type))}
            ListEmptyComponent={isLoading ? undefined : <EmptyListComponent message={translate("no_transactions")} />}
            renderItem={({ item: tx }) => <TransactionCard transaction={tx} />}
            keyExtractor={(_, index) => index.toString()}
        />
    );
};

export default TransactionsList;
