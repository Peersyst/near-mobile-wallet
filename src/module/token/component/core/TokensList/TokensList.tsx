import TokenCard from "../../display/TokenCard/TokenCard";
import useGetTokens from "../../../query/useGetTokens";
import { useGetCkbPrice } from "module/common/query/useCkbPriceConverter";
import MainList from "module/main/component/display/MainList/MainList";
import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import useSelectedWallet from "module/wallet/hook/useSelectedWallet";
import settingsState from "module/settings/state/SettingsState";
import { useRecoilValue } from "recoil";

const TokensList = (): JSX.Element => {
    const { fiat } = useRecoilValue(settingsState);
    const { index } = useSelectedWallet();
    const { isLoading, data = [], refetch } = useGetTokens(index);
    const { isLoading: loadingPrice, refetch: refetchPrice } = useGetCkbPrice(fiat);
    const handleRefetch = async () => {
        await Promise.all([refetch(), refetchPrice()]);
    };
    return (
        <MainList
            onRefresh={handleRefetch}
            loading={isLoading || loadingPrice}
            ListEmptyComponent={isLoading ? undefined : <EmptyListComponent />}
            data={data}
            renderItem={({ item: token }) => <TokenCard token={token} />}
            keyExtractor={(tx) => tx.type.args}
        />
    );
};

export default TokensList;
