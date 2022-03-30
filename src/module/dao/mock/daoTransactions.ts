import { Transaction } from "module/transaction/types";

export const daoTransactions: Transaction[] = [...Array(10)].map((_, i) => ({
    status: "confirmed",
    transactionHash: "0x1234567890abcde" + i,
    inputs: [],
    outputs: [],
    blockHash: "0x1234567890abcde" + i,
    blockNumber: i,
    timestamp: new Date(2022, 0, i + 1, (i * 12) % 24, (i * 21) % 60),
}));