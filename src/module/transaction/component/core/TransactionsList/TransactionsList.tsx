import TransactionCard from "module/transaction/component/display/TransactionCard/TransactionCard";
import { FlatList, ScrollView } from "react-native";
import useGetTransactions from "module/transaction/query/useGetTransactions";
import Divider from "module/common/component/display/Divider/Divider";
import useWallet from "module/wallet/hook/useWallet";
import { Typography } from "react-native-components";
import { translate } from "locale";

const NoTransactionsComponent = (): JSX.Element => {
    return <Typography variant="body1">{translate("no_transactions")}</Typography>;
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
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }} horizontal scrollEnabled={false}>
            <FlatList
                onRefresh={refetch}
                refreshing={isFetching || isLoading}
                data={data}
                ListEmptyComponent={isLoading ? undefined : NoTransactionsComponent}
                renderItem={({ item: tx }) => <TransactionCard {...tx} />}
                keyExtractor={(tx) => tx.transactionHash}
                ItemSeparatorComponent={() => <Divider width="full-width" />}
                style={{ paddingHorizontal: 30 }}
            />
        </ScrollView>
    );
};

export default TransactionsList;
