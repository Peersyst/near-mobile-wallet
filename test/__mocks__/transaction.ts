import { TransactionStatus, TransactionType } from "ckb-peersyst-sdk";
import { FullTransaction } from "module/common/service/CkbSdkService.types";

export const transaction: FullTransaction = {
    status: TransactionStatus.COMMITTED,
    type: TransactionType.SEND_NATIVE_TOKEN,
    amount: 100,
    transactionHash: "0x1234567890abcdef",
    inputs: [],
    outputs: [],
    blockHash: "0x1234567890abcdef",
    blockNumber: 1,
    timestamp: new Date(2022, 0, 29),
};

export const sentTransaction: FullTransaction = {
    status: TransactionStatus.COMMITTED,
    type: TransactionType.SEND_NATIVE_TOKEN,
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

export const receivedTransaction: FullTransaction = {
    status: TransactionStatus.COMMITTED,
    type: TransactionType.RECEIVE_NATIVE_TOKEN,
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

export const transactions: FullTransaction[] = [...Array(3)].map((_, i) => ({
    status: TransactionStatus.COMMITTED,
    type: TransactionType.SEND_NATIVE_TOKEN,
    amount: 100,
    transactionHash: "0x1234567890abcde" + i,
    inputs: [],
    outputs: [],
    blockHash: "0x1234567890abcde" + i,
    blockNumber: i,
    timestamp: new Date(2022, 0, i + 1),
}));

export const createTransaction = (values: Partial<FullTransaction>): FullTransaction => ({ ...transaction, ...values });
