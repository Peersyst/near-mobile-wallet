import { Nft } from "module/nft/types";

export const nft: Nft = {
    tokenId: "1",
    tokenUri: "uri",
    data: {},
    nftName: "NFT",
    nftSymbol: "Symbol",
    nftExtraData: "ExtraData",
};

export const nfts = [...Array(3)].map((_, i) => ({
    tokenId: i.toString(),
    tokenUri: "uri",
    data: {},
    nftName: "NFT" + i,
    nftSymbol: "Symbol",
    nftExtraData: "ExtraData",
}));
