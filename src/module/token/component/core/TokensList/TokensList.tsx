import TokenCard from "../../display/TokenCard/TokenCard";
import MainList from "module/main/component/display/MainList/MainList";
import useGetTokenPriceInUsd from "module/token/query/useGetTokenPriceInUsd";
import EmptyTokenList from "../../feedback/EmptyTokenList/EmptyTokenList";
import MainListSkeleton from "module/main/component/display/MainList/MainListSkeleton";
import TokenCardSkeleton from "../../display/TokenCard/TokenCardSkeleton";
import IntentsTokenCard from "module/intents/components/display/IntentsTokenCard/IntentsTokenCard";
import { useGetSortedTokens } from "module/token/query/useGetSortedTokens";

const TokensList = (): JSX.Element => {
    const { isLoading: isPriceLoading } = useGetTokenPriceInUsd();
    const { refetch: refetchTokens, tokens, isIdle: isIdleTokens, isLoading: isLoadingTokens } = useGetSortedTokens();

    const handleRefetch = async () => {
        await refetchTokens();
    };

    const isLoading = isLoadingTokens || isPriceLoading;

    return isIdleTokens || isLoadingTokens ? (
        <MainListSkeleton Skeleton={TokenCardSkeleton} />
    ) : (
        <MainList
            onRefresh={handleRefetch}
            loading={isLoading}
            ListEmptyComponent={<EmptyTokenList />}
            data={tokens}
            renderItem={({ item: token }) => {
                if ("totalBalance" in token) {
                    return <IntentsTokenCard token={token} />;
                }
                return <TokenCard token={token} />;
            }}
            keyExtractor={(_, index) => index.toString()}
        />
    );
};

export default TokensList;
