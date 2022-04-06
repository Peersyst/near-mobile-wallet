import { Transaction, TransactionStatus, TransactionType } from "@peersyst/ckb-peersyst-sdk";

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

export const transactions: Transaction[] = [...Array(3)].map((_, i) => ({
    status: TransactionStatus.COMMITTED,
    type: TransactionType.SEND_CKB,
    amount: 100,
    transactionHash: "0x1234567890abcde" + i,
    inputs: [],
    outputs: [],
    blockHash: "0x1234567890abcde" + i,
    blockNumber: i,
    timestamp: new Date(2022, 0, i + 1),
}));
