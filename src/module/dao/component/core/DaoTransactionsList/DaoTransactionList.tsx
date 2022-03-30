import { translate } from "locale";
import MainList from "module/main/component/display/MainList/MainList";
import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import DaoTransactionCard from "../../display/DaoTransactionCard";
import useGetDaoTransactions from "module/dao/query/useGetDaoTransactions";

const DaoTransactionsList = (): JSX.Element => {

    const {
        data = [],
        refetch,
        isLoading,
    } = useGetDaoTransactions();

    return (
        <MainList
            onRefresh={refetch}
            loading={isLoading}
            data={data}
            ListEmptyComponent={isLoading ? undefined : <EmptyListComponent message={translate("no_transactions")} />}
            renderItem={({ item: tx }) => <DaoTransactionCard {...tx} />}
            keyExtractor={(tx) => tx.transactionHash}
        />
    );
};

export default DaoTransactionsList;