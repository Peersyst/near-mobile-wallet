import styled from "@peersyst/react-native-styled";
import { Row } from "react-native-components";
import TransactionAmount from "module/transaction/component/display/TransactionAmount/TransactionAmount";

export const TransactionCardRoot = styled(Row, { gap: "4%", alignItems: "center" })(() => ({
    paddingVertical: 14,
}));

export const TransactionAmountConversion = styled(TransactionAmount)(({ theme }) => ({
    color: theme.palette.text,
}));
