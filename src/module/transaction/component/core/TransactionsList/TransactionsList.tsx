import TransactionCard from "module/transaction/component/display/TransactionCard/TransactionCard";
import { FlatList } from "react-native";
import useGetTransactions from "module/transaction/query/useGetTransactions";
import Divider from "module/common/component/display/Divider/Divider";

const TransactionsList = (): JSX.Element => {
    const { isLoading, data = [], refetch } = useGetTransactions("A");

    return (
        <FlatList
            onRefresh={refetch}
            refreshing={isLoading}
            data={data}
            renderItem={({ item: tx }) => <TransactionCard {...tx} />}
            keyExtractor={(tx) => tx.transactionHash}
            ItemSeparatorComponent={() => <Divider width="full-width" />}
            style={{ paddingHorizontal: 30 }}
        />
    );
};

export default TransactionsList;
