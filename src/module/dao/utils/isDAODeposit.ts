import { TransactionType } from "ckb-peersyst-sdk";

export function isDAODeposit(type: TransactionType): boolean {
    return type === TransactionType.DEPOSIT_DAO;
}
