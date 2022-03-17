import TransactionCard from "module/transaction/component/display/TransactionCard/TransactionCard";
import useGetTransactions from "module/transaction/query/useGetTransactions";
import useWallet from "module/wallet/hook/useWallet";
import { Typography } from "react-native-components";
import { translate } from "locale";
import MainList from "module/main/component/display/MainList/MainList";

const NoTransactionsComponent = (): JSX.Element => {
    return (
        <Typography variant="body1" textAlign="center" style={{ marginTop: "10%" }}>
            {translate("no_transactions")}
        </Typography>
    );
};

const TransactionsList = (): JSX.Element => {
    const {
        state: { selectedAccount, cells },
    } = useWallet();

    const {
        data = [],
        refetch,
        isFetching,
        isLoading,
    } = useGetTransactions(selectedAccount !== undefined ? cells[selectedAccount].address : undefined);

    return (
        <MainList
            onRefresh={refetch}
            refreshing={isFetching || isLoading}
            data={data}
            ListEmptyComponent={isLoading ? undefined : NoTransactionsComponent}
            renderItem={({ item: tx }) => <TransactionCard {...tx} />}
            keyExtractor={(tx) => tx.transactionHash}
        />
    );
};

export default TransactionsList;
