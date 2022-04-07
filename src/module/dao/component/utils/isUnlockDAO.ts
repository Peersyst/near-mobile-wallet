import { TransactionType } from "@peersyst/ckb-peersyst-sdk";

export function isUnlockDAO(type: TransactionType): boolean {
    return type === TransactionType.UNLOCK_DAO;
}
