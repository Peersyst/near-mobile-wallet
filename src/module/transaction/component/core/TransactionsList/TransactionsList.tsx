import TransactionCard from "module/transaction/component/display/MainTransactionCard/TransactionCard";
import useGetTransactions from "module/transaction/query/useGetTransactions";
import useWallet from "module/wallet/hook/useWallet";
import { translate } from "locale";
import MainList from "module/main/component/display/MainList/MainList";
import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";

const TransactionsList = (): JSX.Element => {
    const {
        state: { selectedAccount, cells },
    } = useWallet();

    const {
        data = [],
        refetch,
        isLoading,
    } = useGetTransactions(selectedAccount !== undefined ? cells[selectedAccount].address : undefined);

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
