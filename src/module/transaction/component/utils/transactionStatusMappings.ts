import { TransactionStatus } from "ckb-peersyst-sdk";
import { theme } from "module/common/style/theme";

const transactionStatusMappings: Record<TransactionStatus, keyof typeof theme.palette.status> = {
    pending: "warning",
    proposed: "warning",
    committed: "success",
    rejected: "error",
};
export default transactionStatusMappings;
