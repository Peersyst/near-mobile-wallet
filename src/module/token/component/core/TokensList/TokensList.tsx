import TokenCard from "../../display/TokenCard/TokenCard";
import useGetTokens from "../../../query/useGetTokens";
import MainList from "module/main/component/display/MainList/MainList";
import settingsState from "module/settings/state/SettingsState";
import { useRecoilValue } from "recoil";
import { useRefetchQueries } from "../../../../../refactor/ui/common/query/useRefetchQueries";
import useWalletState from "module/wallet/hook/useWalletState";
import Queries from "../../../../../refactor/ui/common/query/queries";
import { config } from "refactor/common/config";
import useGetTokenPriceInUsd from "module/token/query/useGetTokenPriceInUsd";
import EmptyTokenList from "../../feedback/EmptyTokenList/EmptyTokenList";
import MainListSkeleton from "module/main/component/display/MainList/MainListSkeleton";
import TokenCardSkeleton from "../../display/TokenCard/TokenCardSkeleton";

const TokensList = (): JSX.Element => {
    const { fiat, network } = useRecoilValue(settingsState);
    const {
        state: { selectedWallet },
    } = useWalletState();
    const { isIdle: isIdleTokens, isLoading: isLoadingTokens, data: tokens = [], refetch: refetchTokens } = useGetTokens(selectedWallet);
    const { isLoading: isPriceLoading } = useGetTokenPriceInUsd();
    const refetch = useRefetchQueries();

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
            renderItem={({ item: token }) => <TokenCard token={token} />}
            keyExtractor={(_, index) => index.toString()}
        />
    );
};

export default TokensList;
