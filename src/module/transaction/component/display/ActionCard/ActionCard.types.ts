import { Transaction, TransactionAction, TransactionActionKind } from "near-peersyst-sdk";

export enum AddedTransactionActionKind {
    TRANSFER_RECEIVE = "TRANSFER_RECEIVE",
    TRANSFER_SEND = "TRANSFER_SEND",
}

export type EnhancedTransactionActionKind = Exclude<keyof typeof TransactionActionKind, "TRANSFER"> | AddedTransactionActionKind;

export type EnhancedTransactionAction = Omit<TransactionAction, "actionKind"> & {
    transaction: Omit<Transaction, "transactionActions">;
    actionKind: EnhancedTransactionActionKind;
};

export interface ActionCardProps {
    action: EnhancedTransactionAction;
}
