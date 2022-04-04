import styled from "@peersyst/react-native-styled";
import { Row } from "react-native-components";

export const TransactionCardRoot = styled(Row, { gap: "4%", alignItems: "center" })(() => ({
    paddingVertical: 14,
}));
