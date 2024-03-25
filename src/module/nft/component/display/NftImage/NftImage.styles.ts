import styled from "@peersyst/react-native-styled";
import { Image } from "@peersyst/react-native-components";
import { NftImageProps, NftImageSize } from "./NftImage";

const NFT_CARD_WIDTH_SMALL = 112;
const NFT_CARD_WIDTH_LARGE = 350;

export const NftImageRoot = styled(Image)<NftImageProps>(({ theme: { palette: p, borderRadiusXs }, size }) => ({
    borderRadius: borderRadiusXs,
    backgroundColor: p.gray[300],
    width: size === NftImageSize.SMALL ? NFT_CARD_WIDTH_SMALL : NFT_CARD_WIDTH_LARGE,
    height: size === NftImageSize.SMALL ? NFT_CARD_WIDTH_SMALL : NFT_CARD_WIDTH_LARGE,
}));
