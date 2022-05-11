import useGetTransactions from "module/transaction/query/useGetTransactions";
import { translate } from "locale";
import MainList from "module/main/component/display/MainList/MainList";
import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import TransactionCard from "module/transaction/component/display/TransactionCard/TransactionCard";
import isCKBTransaction from "module/transaction/component/utils/isCKBTransaction";

const TransactionsList = (): JSX.Element => {
    const { data = [], refetch, isLoading } = useGetTransactions({ filter: (tx) => isCKBTransaction(tx.type) });

    return (
        <MainList
            onRefresh={refetch}
            loading={isLoading}
            data={data}
            ListEmptyComponent={isLoading ? undefined : <EmptyListComponent message={translate("no_transactions")} />}
            renderItem={({ item: tx }) => <TransactionCard transaction={tx} />}
            keyExtractor={(_, index) => index.toString()}
        />
    );
};

export default TransactionsList;
