import { Row } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";
import { BaseTransactionRootProps } from "./BaseTransactionCard.types";

export const BaseTransactionCardRoot = styled(Row, { gap: "4%", alignItems: "center" })<BaseTransactionRootProps>(({ last }) => ({
    paddingVertical: 14,
    marginBottom: last ? 25 : 0,
}));
