import styled from "@peersyst/react-native-styled";
import { Row } from "react-native-components";
import { View } from "react-native";

export const TransactionIcon = styled(View)(({ theme }) => ({
    width: 45,
    height: 45,
    backgroundColor: theme.palette.gray,
    borderRadius: 25,
}));

export const TransactionCardRoot = styled(Row, { gap: "4%", alignItems: "center" })(() => ({
    paddingVertical: 20,
}));
