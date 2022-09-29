import styled from "@peersyst/react-native-styled";
import { Row } from "@peersyst/react-native-components";
import TransactionAmount from "module/transaction/component/display/TransactionAmount/TransactionAmount";
import { TransactionRootProps } from "./TransactionCard.types";

export const TransactionCardRoot = styled(Row, { gap: "4%", alignItems: "center" })<TransactionRootProps>(({ last }) => ({
    paddingVertical: 14,
    marginBottom: last ? 25 : 0,
}));

export const TransactionAmountConversion = styled(TransactionAmount)(({ theme }) => ({
    color: theme.palette.text,
}));
