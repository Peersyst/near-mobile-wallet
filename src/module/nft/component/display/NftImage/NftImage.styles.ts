import styled from "@peersyst/react-native-styled";
import { Image } from "@peersyst/react-native-components";
import { NftImageProps } from "./NftImage";

const NFT_CARD_WIDTH = 112;

export const NftImageRoot = styled(Image)<NftImageProps>(({ theme: { palette: p, borderRadiusXs } }) => ({
    borderRadius: borderRadiusXs,
    backgroundColor: p.gray[100],
    width: NFT_CARD_WIDTH,
    height: NFT_CARD_WIDTH,
    objectFit: "cover",
}));
