export interface DepositInDAOParams {
    amount: bigint;
    mnemonic: string[];
    feeRate?: string;
}

export interface SendTransactionParams {
    amount: bigint;
    mnemonic: string[];
    message: string;
    to: string;
    feeRate?: string;
}
