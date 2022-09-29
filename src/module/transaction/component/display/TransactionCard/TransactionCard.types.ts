import { FullTransaction } from "module/common/service/CkbSdkService.types";

export interface TransactionCardProps {
    transaction: FullTransaction;
    last?: boolean;
}

export interface TransactionRootProps {
    last: boolean;
}
