import { TransactionType } from "module/transaction/types";

export function isDAOTransaction(type: TransactionType): boolean {
    switch (type) {
        case TransactionType.DEPOSIT_DAO:
        case TransactionType.WITHDRAW_DAO:
        case TransactionType.UNLOCK_DAO:
            return true;
        default:
            return false;
    }
}
