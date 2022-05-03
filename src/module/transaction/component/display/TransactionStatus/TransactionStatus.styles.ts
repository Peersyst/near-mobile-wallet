import { TransactionStatus } from "module/transaction/types";
import styled from "@peersyst/react-native-styled";
import { Typography } from "react-native-components";
import { theme } from "module/common/style/theme";

export interface TransactionStatusRootProps {
    status: TransactionStatus;
}

const transactionStatusMappings: Record<TransactionStatus, keyof typeof theme.palette.status> = {
    pending: "warning",
    proposed: "info",
    committed: "success",
    rejected: "error",
};

export const TransactionStatusRoot = styled(Typography)<TransactionStatusRootProps>(({ theme, status }) => ({
    color: theme.palette.status[transactionStatusMappings[status]],
}));
