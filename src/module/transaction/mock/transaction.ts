import { Transaction } from "../types";

export const transaction: Transaction = {
    status: "confirmed",
    transactionHash: "0x1234567890abcdef",
    inputs: [],
    outputs: [],
    blockHash: "0x1234567890abcdef",
    blockNumber: 1,
    timestamp: new Date(2022, 0, 29),
};

export const transactions = [...Array(10)].map((_, i) => ({
    status: "confirmed",
    transactionHash: "0x1234567890abcde" + i,
    inputs: [],
    outputs: [],
    blockHash: "0x1234567890abcde" + i,
    blockNumber: i,
    timestamp: new Date(2022, 0, i + 1, (i * 12) % 24, (i * 21) % 60),
}));
