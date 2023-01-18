import useGetNfts from "module/nft/query/useGetNfts";
import NftCard from "module/nft/component/display/NftCard/NftCard";
import MainList from "module/main/component/display/MainList/MainList";
import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import useSelectedWalletIndex from "module/wallet/hook/useSelectedWalletIndex";

const NftsList = (): JSX.Element => {
    const index = useSelectedWalletIndex();
    const { data = [], isLoading, refetch: refetchNfts } = useGetNfts(index);

    const handleRefetch = async () => {
        await refetchNfts();
    };

    return (
        <MainList
            onRefresh={handleRefetch}
            loading={isLoading}
            data={data}
            renderItem={({ item: nft }) => <NftCard nft={nft} />}
            ListEmptyComponent={isLoading ? undefined : <EmptyListComponent />}
            keyExtractor={(nft, i) => nft?.tokenId ?? i}
        />
    );
};

export default NftsList;
