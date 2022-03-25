import styled from "@peersyst/react-native-styled";
import { Image } from "react-native";
import { Row } from "react-native-components";

export const TokenIcon = styled(Image)(() => ({
    width: 42,
    height: 42,
    borderRadius: 10,
}));

export const TokenRoot = styled(Row, { alignItems: "center", justifyContent: "space-between" })(() => ({
    paddingVertical: 14,
}));
