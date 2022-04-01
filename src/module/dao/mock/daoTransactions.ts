import { TransactionStatus, TransactionType } from "module/transaction/types";

export const daoTransactions = [...Array(10)].map((_, i) => ({
    status: TransactionStatus.COMMITTED,
    type: TransactionType.DEPOSIT_DAO,
    amount: 10 * i + 2,
    transactionHash: "0x1234567890abcde" + i,
    inputs: [],
    outputs: [],
    blockHash: "0x1234567890abcde" + i,
    blockNumber: i,
    timestamp: new Date(2022, 0, i + 1, (i * 12) % 24, (i * 21) % 60),
}));
