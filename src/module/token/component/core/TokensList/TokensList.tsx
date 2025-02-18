import TokenCard from "../../display/TokenCard/TokenCard";
import MainList from "module/main/component/display/MainList/MainList";
import settingsState from "module/settings/state/SettingsState";
import { useRecoilValue } from "recoil";
import { useRefetchQueries } from "../../../../../query/useRefetchQueries";
import Queries from "../../../../../query/queries";
import { config } from "config";
import useGetTokenPriceInUsd from "module/token/query/useGetTokenPriceInUsd";
import EmptyTokenList from "../../feedback/EmptyTokenList/EmptyTokenList";
import MainListSkeleton from "module/main/component/display/MainList/MainListSkeleton";
import TokenCardSkeleton from "../../display/TokenCard/TokenCardSkeleton";
import IntentsTokenCard from "module/intents/components/display/IntentsTokenCard/IntentsTokenCard";
import { useGetSortedTokens } from "module/token/query/useGetSortedTokens";

const TokensList = (): JSX.Element => {
    const { fiat, network } = useRecoilValue(settingsState);
    const { isLoading: isPriceLoading } = useGetTokenPriceInUsd();
    const refetch = useRefetchQueries();
    const { refetch: refetchTokens, tokens, isIdle: isIdleTokens, isLoading: isLoadingTokens } = useGetSortedTokens();

    const handleRefetch = async () => {
        await Promise.all([
            refetchTokens(),
            refetch([Queries.TOKENS_PRICE, network]),
            refetch([Queries.COIN_PRICE, config.coingeckoUSDTApiId, fiat]),
        ]);
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
