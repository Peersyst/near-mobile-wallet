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

const transactionTypes = [TransactionType.SEND_CKB, TransactionType.RECEIVE_CKB, TransactionType.SEND_TOKEN, TransactionType.RECEIVE_TOKEN];

const tokens = ["ETH", "USDC", "TAI", "COOP"];

export const transactions: Transaction[] = [...Array(10)].map((_, i) => {
    const seed = Math.floor(Math.random() * -3 + 4);
    const tokenSeed = Math.floor(Math.random() * -3 + 4);
    return {
        status: TransactionStatus.COMMITTED,
        type: transactionTypes[seed],
        amount: 145.2 * seed + 2,
        transactionHash: "0x1234567890abcde" + i,
        inputs: [],
        outputs: [],
        blockHash: "0x1234567890abcde" + i,
        blockNumber: i,
        timestamp: new Date(2022, 0, i + 1, (seed * 12 * i) % 24, (seed * 21 * i) % 60),
        token: seed === 2 || seed === 3 ? tokens[tokenSeed] : undefined,
    };
});
