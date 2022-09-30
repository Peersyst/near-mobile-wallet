import styled from "@peersyst/react-native-styled";
import { Image, View } from "react-native";
import { Row } from "@peersyst/react-native-components";

export const TokenIcon = styled(Image)(() => ({
    width: 44,
    height: 44,
    borderRadius: 10,
}));

export const TokenPlaceholder = styled(View)(({ theme }) => ({
    width: 44,
    height: 44,
    borderRadius: 50,
    backgroundColor: theme.palette.darkLightGray,
}));

export const TokenRoot = styled(Row, { alignItems: "center", justifyContent: "space-between" })(() => ({
    paddingVertical: 14,
}));
