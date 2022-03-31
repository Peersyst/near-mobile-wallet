import useGetTransactions from "module/transaction/query/useGetTransactions";
import { translate } from "locale";
import MainList from "module/main/component/display/MainList/MainList";
import useSelectedWallet from "module/wallet/hook/useSelectedWallet";
import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import MainTransactionCard from "../../display/MainTransactionCard/MainTransactionCard";

const TransactionsList = (): JSX.Element => {
    const { index } = useSelectedWallet();

    const { data = [], refetch, isLoading } = useGetTransactions(index);

    return (
        <MainList
            onRefresh={refetch}
            loading={isLoading}
            data={data}
            ListEmptyComponent={isLoading ? undefined : <EmptyListComponent message={translate("no_transactions")} />}
            renderItem={({ item: tx }) => <MainTransactionCard {...tx} />}
            keyExtractor={(tx) => tx.transactionHash}
        />
    );
};

export default TransactionsList;
