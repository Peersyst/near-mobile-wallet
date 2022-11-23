import { TransactionStatus } from "near-peersyst-sdk";
import { theme } from "config/theme/theme";

const transactionStatusMappings: Record<TransactionStatus, keyof typeof theme.palette.status> = {
    pending: "warning",
    proposed: "warning",
    committed: "success",
    rejected: "error",
};
export default transactionStatusMappings;
