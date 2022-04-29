import { TransactionType } from "@peersyst/ckb-peersyst-sdk";

export function isUnlockOrWithdrawDAO(type: TransactionType): boolean {
    return type === TransactionType.UNLOCK_DAO || type === TransactionType.WITHDRAW_DAO;
}
