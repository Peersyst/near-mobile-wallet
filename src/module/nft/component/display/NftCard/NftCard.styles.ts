import styled from "@peersyst/react-native-styled";
import { View } from "react-native";
import { Row } from "react-native-components";

export const NftCardRoot = styled(Row, { gap: 22 })(() => ({
    paddingVertical: 20,
}));

export const NftCardImage = styled(View)(({ theme }) => ({
    borderRadius: theme.borderRadius,
    backgroundColor: theme.palette.gray,
    width: 150,
    height: 150,
}));
