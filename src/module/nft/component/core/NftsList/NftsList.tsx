import useWallet from "module/wallet/hook/useWallet";
import useGetNfts from "module/nft/query/useGetNfts";
import NftCard from "module/nft/component/display/NftCard/NftCard";
import { translate } from "locale";
import MainList from "module/main/component/display/MainList/MainList";
import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";

const NftsList = (): JSX.Element => {
    const {
        state: { selectedAccount, cells },
    } = useWallet();
    const { data = [], refetch, isLoading } = useGetNfts(selectedAccount !== undefined ? cells[selectedAccount].address : undefined);

    return (
        <MainList
            onRefresh={refetch}
            loading={isLoading}
            data={data}
            renderItem={({ item: nft }) => <NftCard {...nft} />}
            ListEmptyComponent={isLoading ? undefined : <EmptyListComponent message={translate("no_nfts")} />}
            keyExtractor={(nft) => nft.tokenId}
        />
    );
};

export default NftsList;
