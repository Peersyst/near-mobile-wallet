import { Nft } from "module/nft/types";

export const nft: Nft = {
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
