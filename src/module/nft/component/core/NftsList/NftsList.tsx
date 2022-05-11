import useGetNfts from "module/nft/query/useGetNfts";
import NftCard from "module/nft/component/display/NftCard/NftCard";
import MainList from "module/main/component/display/MainList/MainList";
import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import useSelectedWallet from "module/wallet/hook/useSelectedWallet";

const NftsList = (): JSX.Element => {
    const { index } = useSelectedWallet();
    const { data = [], refetch, isLoading } = useGetNfts(index);

    return (
        <MainList
            onRefresh={refetch}
            loading={isLoading}
            data={data}
            renderItem={({ item: nft }) => <NftCard {...nft} />}
            ListEmptyComponent={isLoading ? undefined : <EmptyListComponent />}
            keyExtractor={(nft) => nft.tokenId}
        />
    );
};

export default NftsList;
