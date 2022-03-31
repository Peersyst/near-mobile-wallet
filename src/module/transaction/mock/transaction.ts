import { Transaction, TransactionStatus, TransactionType } from "../types";

export const transaction: Transaction = {
    status: TransactionStatus.COMMITTED,
    type: TransactionType.SEND_CKB,
    amount: 100,
    transactionHash: "0x1234567890abcdef",
    inputs: [],
    outputs: [],
    blockHash: "0x1234567890abcdef",
    blockNumber: 1,
    timestamp: new Date(2022, 0, 29),
};

export const transactions = [...Array(10)].map((_, i) => ({
    status: TransactionStatus.COMMITTED,
    type: TransactionType.SEND_CKB,
    amount: 145.2*i+2,
    transactionHash: "0x1234567890abcde" + i,
    inputs: [],
    outputs: [],
    blockHash: "0x1234567890abcde" + i,
    blockNumber: i,
    timestamp: new Date(2022, 0, i + 1, (i * 12) % 24, (i * 21) % 60),
}));
