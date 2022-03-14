import styled from "@peersyst/react-native-styled";
import { View } from "react-native";
import { Row } from "react-native-components";
import { Dimensions } from "react-native";

const NFT_CARD_WIDTH = Dimensions.get("window").width / 3;

export const NftCardRoot = styled(Row, { gap: "5%" })(() => ({
    paddingVertical: 20,
}));

export const NftCardImage = styled(View)(({ theme }) => ({
    borderRadius: theme.borderRadius,
    backgroundColor: theme.palette.gray,
    width: NFT_CARD_WIDTH,
    height: NFT_CARD_WIDTH,
}));
