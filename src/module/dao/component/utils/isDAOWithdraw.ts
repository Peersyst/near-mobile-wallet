import { TransactionType } from "module/transaction/types";

export function isDAOWithdraw(type: TransactionType): boolean {
    return type === TransactionType.WITHDRAW_DAO;
}