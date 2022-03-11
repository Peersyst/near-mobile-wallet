import TransactionCard from "module/transaction/component/display/TransactionCard/TransactionCard";
import { FlatList, ScrollView } from "react-native";
import useGetTransactions from "module/transaction/query/useGetTransactions";
import Divider from "module/common/component/display/Divider/Divider";
import useWallet from "module/wallet/hook/useWallet";

const TransactionsList = (): JSX.Element => {
    const {
        state: { selectedAccount, cells },
    } = useWallet();
    const {
        data = [],
        refetch,
        isFetching,
    } = useGetTransactions(selectedAccount !== undefined ? cells[selectedAccount].address : undefined);

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }} horizontal scrollEnabled={false}>
            <FlatList
                onRefresh={refetch}
                refreshing={isFetching}
                data={data}
                renderItem={({ item: tx }) => <TransactionCard {...tx} />}
                keyExtractor={(tx) => tx.transactionHash}
                ItemSeparatorComponent={() => <Divider width="full-width" />}
                style={{ paddingHorizontal: 30 }}
            />
        </ScrollView>
    );
};

export default TransactionsList;
