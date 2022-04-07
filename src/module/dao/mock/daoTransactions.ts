import { TransactionStatus, TransactionType } from "module/transaction/types";

const transactionTypes = [TransactionType.DEPOSIT_DAO, TransactionType.WITHDRAW_DAO];

export const DAOTransactions = [...Array(10)].map((_, i) => {
    const seed = Math.random() > 0.5 ? 1 : 0;
    return {
        status: TransactionStatus.COMMITTED,
        type: transactionTypes[seed],
        amount: (10 + seed * i + i) * 50,
        transactionHash: "0x1234567890abcde" + i,
        inputs: [],
        outputs: [],
        blockHash: "0x1234567890abcde" + i,
        blockNumber: i,
        timestamp: new Date(2022, 0, i + 1, (seed + 12 + i) % 24, (seed + 21 + i) % 60),
    };
});
