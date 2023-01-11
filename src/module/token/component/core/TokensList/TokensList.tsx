import TokenCard from "../../display/TokenCard/TokenCard";
import useGetTokens from "../../../query/useGetTokens";
import MainList from "module/main/component/display/MainList/MainList";
import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import settingsState from "module/settings/state/SettingsState";
import { useRecoilValue } from "recoil";
import { useRefetchQueries } from "../../../../../query/useRefetchQueries";
import useWalletState from "module/wallet/hook/useWalletState";
import Queries from "../../../../../query/queries";

const TokensList = (): JSX.Element => {
    const { fiat } = useRecoilValue(settingsState);
    const {
        state: { selectedWallet },
    } = useWalletState();
    const { isLoading, data: tokens = [] } = useGetTokens(selectedWallet);
    const refetch = useRefetchQueries();

    const handleRefetch = async () => {
        await refetch([Queries.TOKENS_PRICE, fiat]);
    };

    return (
        <MainList
            onRefresh={handleRefetch}
            loading={isLoading}
            ListEmptyComponent={isLoading ? undefined : <EmptyListComponent />}
            data={tokens}
            renderItem={({ item: token }) => <TokenCard token={token} />}
            keyExtractor={(token) => token.metadata.symbol}
        />
    );
};

export default TokensList;
