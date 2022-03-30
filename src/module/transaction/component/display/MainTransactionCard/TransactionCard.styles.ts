import styled from "@peersyst/react-native-styled";
import { Icon, Row } from "react-native-components";

export const TransactionIcon = styled(Icon)(() => ({
    fontSize: 28,
}));

export const TransactionCardRoot = styled(Row, { gap: "4%", alignItems: "center" })(() => ({
    paddingVertical: 14,
}));
