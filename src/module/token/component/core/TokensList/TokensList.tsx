import Divider from "module/common/component/display/Divider/Divider";
import TokenCard from "../../display/TokenCard/TokenCard";
import useGetTokens from "../../../query/useGetTokens";
import { useGetCkbPrice } from "module/common/query/useCkbPriceConverter";
import { List } from "react-native-components";
import useWallet from "module/wallet/hook/useWallet";
import NoTokensComponent from "./NoTokensComponent";

const TokensList = (): JSX.Element => {
    const {
        state: { selectedAccount, cells },
    } = useWallet();
    const { isLoading, data = [], refetch } = useGetTokens(selectedAccount !== undefined ? cells[selectedAccount].address : undefined);
    const { isLoading: loadingPrice, refetch: refetchPrice } = useGetCkbPrice("usd");
    const handleRefetch = () => {
        refetch();
        refetchPrice();
    };
    return (
        <List
            onRefresh={handleRefetch}
            refreshing={isLoading || loadingPrice}
            ListEmptyComponent={isLoading ? undefined : NoTokensComponent}
            data={data}
            renderItem={({ item: token }) => <TokenCard token={token} />}
            keyExtractor={(tx) => tx.type.codeHash}
            ItemSeparatorComponent={() => <Divider width="full-width" />}
            style={{ paddingHorizontal: 30 }}
        />
    );
};

export default TokensList;
