import styled from "@peersyst/react-native-styled";
import { Image } from "react-native";
import { Row } from "react-native-components";

export const TokenIcon = styled(Image)(() => ({
    width: 51,
    height: 51,
    borderRadius: 10,
    backgroundColor: "gray",
}));

export const TokenRoot = styled(Row, { alignItems: "center", justifyContent: "space-between" })(() => ({
    paddingVertical: 15,
}));
