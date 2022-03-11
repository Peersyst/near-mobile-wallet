import { FlatList } from "react-native";
import Divider from "module/common/component/display/Divider/Divider";
import Token from "../../display/Token/Token";
import useGetTokens from "../../query/useGetTokens";

const TokensList = (): JSX.Element => {
    const { isLoading, data = [], refetch } = useGetTokens("A");

    return (
        <FlatList
            onRefresh={refetch}
            refreshing={isLoading}
            data={data}
            renderItem={({ item: token }) => <Token token={token} />}
            keyExtractor={(tx) => tx.type.codeHash}
            ItemSeparatorComponent={() => <Divider width="full-width" />}
            style={{ paddingHorizontal: 30, paddingTop: 5 }}
        />
    );
};

export default TokensList;
