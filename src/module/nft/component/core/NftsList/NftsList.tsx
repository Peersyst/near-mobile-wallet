import useGetNfts from "module/nft/query/useGetNfts";
import NftCard from "module/nft/component/display/NftCard/NftCard";
import MainList from "module/main/component/display/MainList/MainList";
import useSelectedWalletIndex from "module/wallet/hook/useSelectedWalletIndex";
import EmptyNftList from "../../feedback/EmptyNftList/EmptyNftList";
import MainListSkeleton from "module/main/component/display/MainList/MainListSkeleton";
import NftCardSkeleton from "../../display/NftCard/NftCardSkeleton";

const NftsList = (): JSX.Element => {
    const index = useSelectedWalletIndex();
    const { data = [], isIdle, isLoading, refetch: refetchNfts } = useGetNfts(index);

    const handleRefetch = async () => {
        await refetchNfts();
    };

    return isIdle || isLoading ? (
        <MainListSkeleton Skeleton={NftCardSkeleton} />
    ) : (
        <MainList
            onRefresh={handleRefetch}
            data={data}
            renderItem={({ item: nft }) => <NftCard nft={nft} />}
            ListEmptyComponent={<EmptyNftList />}
            keyExtractor={(nft, i) => nft?.tokenId ?? i}
        />
    );
};

export default NftsList;
