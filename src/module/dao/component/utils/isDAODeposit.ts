import { TransactionType } from "@peersyst/ckb-peersyst-sdk";

export function isDAODeposit(type: TransactionType): boolean {
    return type === TransactionType.DEPOSIT_DAO;
}
