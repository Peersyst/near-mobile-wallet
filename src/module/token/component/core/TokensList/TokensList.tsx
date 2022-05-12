import TokenCard from "../../display/TokenCard/TokenCard";
import useGetTokens from "../../../query/useGetTokens";
import { useGetCkbPrice } from "module/common/query/useGetCkbPrice";
import MainList from "module/main/component/display/MainList/MainList";
import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import useSelectedWallet from "module/wallet/hook/useSelectedWallet";
import settingsState from "module/settings/state/SettingsState";
import { useRecoilValue } from "recoil";
import { tokensList } from "module/token/mock/token";
import { useRefetchQueries } from "../../../../../query/useRefetchQueries";
import { useMemo } from "react";

const TokensList = (): JSX.Element => {
    const { fiat } = useRecoilValue(settingsState);
    const { index } = useSelectedWallet();
    const { isLoading, data: tokens = [], refetch: refetchTokens } = useGetTokens(index);
    const tokenPriceUseQueries = useMemo(() => tokensList.map((token) => ["tokenPrice", fiat, token]), [tokensList]);
    const refetch = useRefetchQueries();
    const handleRefetch = async () => {
        await Promise.all([refetchTokens(), refetch(tokenPriceUseQueries)]);
    };
    return (
        <MainList
            onRefresh={handleRefetch}
            loading={isLoading}
            ListEmptyComponent={isLoading ? undefined : <EmptyListComponent />}
            data={tokens}
            renderItem={({ item: token }) => <TokenCard token={token} />}
            keyExtractor={(tx) => tx.type.args}
        />
    );
};

export default TokensList;
