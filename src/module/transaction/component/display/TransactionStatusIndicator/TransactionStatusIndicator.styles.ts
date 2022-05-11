import { TransactionStatus } from "module/sdk";
import styled from "@peersyst/react-native-styled";
import { View } from "react-native";
import transactionStatusMappings from "module/transaction/component/utils/transactionStatusMappings";

export interface TransactionStatusIndicatorRootProps {
    status: TransactionStatus;
}

export const TransactionStatusIndicatorRoot = styled(View)<TransactionStatusIndicatorRootProps>(({ theme, status }) => ({
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: theme.palette.status[transactionStatusMappings[status]],
}));
