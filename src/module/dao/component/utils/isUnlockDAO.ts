import { TransactionType } from "module/transaction/types";

export function isUnlockDAO(type: TransactionType): boolean {
    return type === TransactionType.UNLOCK_DAO;
}