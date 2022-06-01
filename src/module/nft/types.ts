export interface Nft {
    tokenId: string;
    tokenUri: string;
    data: {
        artist: string;
        imageUri: string;
        price: string;
    };
    nftName: string;
    nftSymbol: string;
    nftExtraData: string;
}
