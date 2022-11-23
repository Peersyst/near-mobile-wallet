import { Nft as OldNft } from "module/nft/types";
import { Nft } from "module/sdk/mock.types";

export const tempNft: Nft = {
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
    approved_account_ids: [],
};

export const nft: OldNft = {
    tokenId: "1",
    tokenUri: "uri",
    data: {
        artist: "VicirArt",
        imageUri: "https://912139745222-production-files.s3.amazonaws.com/uploads%2Ff80f4ff2-72a4-4c94-b759-2af0a2f5c44e.jpeg?tid=0",
        price: "45000",
    },
    nftName: "NFT",
    nftSymbol: "Symbol",
    nftExtraData: "ExtraData",
};

export const nfts = [...Array(3)].map((_, i) => ({
    tokenId: i.toString(),
    tokenUri: "uri",
    data: {
        artist: "VicirArt",
        imageUri: "https://912139745222-production-files.s3.amazonaws.com/uploads%2Ff80f4ff2-72a4-4c94-b759-2af0a2f5c44e.jpeg?tid=0",
        price: "45000",
    },
    nftName: "NFT" + i,
    nftSymbol: "Symbol",
    nftExtraData: "ExtraData",
}));
