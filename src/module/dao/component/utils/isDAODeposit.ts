import { TransactionType } from "module/transaction/types";

export function isDAODeposit(type: TransactionType): boolean {
    return type === TransactionType.DEPOSIT_DAO;
}