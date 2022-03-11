import { FlatList } from "react-native";
import Divider from "module/common/component/display/Divider/Divider";
import TokenCard from "../../display/TokenCard/TokenCard";
import useGetTokens from "../../query/useGetTokens";
import { useGetCkbPrice } from "module/common/query/useCkbPriceConverter";

const TokensList = (): JSX.Element => {
    const { isLoading, data = [], refetch } = useGetTokens("A");
    const { isLoading: loadingPrice, refetch: refetchPrice } = useGetCkbPrice("usd");
    const handleRefetch = () => {
        refetch();
        refetchPrice();
    };
    return (
        <FlatList
            onRefresh={handleRefetch}
            refreshing={isLoading && loadingPrice}
            data={data}
            renderItem={({ item: token }) => <TokenCard token={token} />}
            keyExtractor={(tx) => tx.type.codeHash}
            ItemSeparatorComponent={() => <Divider width="full-width" />}
            style={{ paddingHorizontal: 30 }}
        />
    );
};

export default TokensList;
