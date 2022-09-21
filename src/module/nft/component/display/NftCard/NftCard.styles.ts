import styled from "@peersyst/react-native-styled";
import { Row, Image } from "@peersyst/react-native-components";
import { Dimensions } from "react-native";

const NFT_CARD_WIDTH = Dimensions.get("window").width / 3;

export const NftCardRoot = styled(Row, { gap: "5%" })(() => ({
    paddingVertical: 14,
}));

export const NftCardImage = styled(Image)(({ theme }) => ({
    borderRadius: theme.borderRadius,
    backgroundColor: theme.palette.gray[300],
    width: NFT_CARD_WIDTH,
    height: NFT_CARD_WIDTH,
}));
