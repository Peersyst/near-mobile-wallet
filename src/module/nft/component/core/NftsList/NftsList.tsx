import useGetNfts from "module/nft/query/useGetNfts";
import NftCard from "module/nft/component/display/NftCard/NftCard";
import MainList from "module/main/component/display/MainList/MainList";
import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import useSelectedWallet from "module/wallet/hook/useSelectedWallet";

const NftsList = (): JSX.Element => {
    const { index } = useSelectedWallet();
    const { data = [], isLoading } = useGetNfts(index);
    const nfts = new Array(10).fill(0).map((_, i) => ({
        token_id: "0",
        owner_id: "doctorparra.near",
        contract_id: "nuer.near",
        events: [
            {
                type: "nft_transfer",
                price: 200000.23423,
                receiver_id: "doctorparra.near",
                sender_id: "nuer.near",
            },
        ],
        metadata: {
            title: "NEAR CAMEL 21 #19",
            description: "INDIAN CAMEL",
            media: "https://ipfs.fleek.co/ipfs/bafybeiffkdczuvd6neggcggg63xd2ptdartq2rkzufob55qfkrrrby3kky",
            media_hash: null,
            copies: 1,
            issued_at: null,
            expires_at: null,
            starts_at: null,
            updated_at: null,
            extra: null,
            reference: null,
            reference_hash: null,
        },
        approved_account_ids: {},
    }));
    return (
        <MainList
            loading={isLoading}
            data={nfts}
            renderItem={({ item: nft, index }) => <NftCard nft={nft} index={index} />}
            ListEmptyComponent={isLoading ? undefined : <EmptyListComponent />}
            keyExtractor={(nft) => nft.tokenId}
        />
    );
};

export default NftsList;
