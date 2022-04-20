import { DAOUnlockableAmount, FeeRate, Transaction } from "@peersyst/ckb-peersyst-sdk";

export interface DepositInDAOParams {
    amount: bigint;
    mnemonic: string[];
    feeRate?: FeeRate;
}

export interface SendTransactionParams {
    amount: bigint;
    mnemonic: string[];
    message: string;
    to: string;
    feeRate?: FeeRate;
}

export interface WithdrawAndUnlockParams {
    unlockableAmount: DAOUnlockableAmount;
    mnemonic: string[];
}

export interface FullTransaction extends Transaction {
    token?: string;
}
