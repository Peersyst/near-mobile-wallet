import { Transaction, TransactionStatus, TransactionType } from "module/transaction/types";

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

export const sentTransaction: Transaction = {
    status: TransactionStatus.COMMITTED,
    type: TransactionType.SEND_CKB,
    amount: 100,
    transactionHash: "0x1234567890abcdef",
    inputs: [],
    outputs: [
        {
            quantity: 10250,
            address: "ckb1qqypm0l63rdt2jayymfrrjnyadmqe630a8skwcdpmfqqmgdje0sjsqfyxx8e4nfdhtjf2eynl0wnx5zprz6s77gmudv2e",
        },
    ],
    blockHash: "0x1234567890abcdef",
    blockNumber: 1,
    timestamp: new Date(2022, 0, 29),
};

export const receivedTransaction: Transaction = {
    status: TransactionStatus.COMMITTED,
    type: TransactionType.RECEIVE_CKB,
    amount: 100,
    transactionHash: "0x1234567890abcdef",
    inputs: [
        {
            quantity: 39842,
            address: "ckb1qqypm0l63rdt2jayymfrrjnyadmqe630a8skwcdpmfqqmgdje0sjsqfyxx8e4nfdhtjf2eynl0wnx5zprz6s77gmudv2e",
        },
        {
            quantity: 9485,
            address: "ckb1qyqy5vmywpty6p72wpvm0xqys8pdtxqf6cmsr8p2l0",
        },
        {
            quantity: 49532,
            address: "ckb1qyqdmeuqrsrnm7e5vnrmruzmsp4m9wacf6vsxasryq",
        },
    ],
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

export const createTransaction = (values: Partial<Transaction>): Transaction => ({ ...transaction, ...values });
