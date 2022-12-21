import { TransactionActionKind } from "near-peersyst-sdk";
import { config } from "config";
import { AddedTransactionActionKind, EnhancedTransactionAction, EnhancedTransactionActionKind } from "../ActionCard.types";

export const TRANSFER_ACTIONS: EnhancedTransactionActionKind[] = [
    AddedTransactionActionKind.TRANSFER_RECEIVE,
    AddedTransactionActionKind.TRANSFER_SEND,
];

export interface GetAmountAndTokenNameFromAction {
    amount: string | undefined;
    tokenName?: string;
}

export default function getAmountAndTokenNameFromAction({
    actionKind,
    deposit,
    stake,
}: EnhancedTransactionAction): GetAmountAndTokenNameFromAction | undefined {
    if (TRANSFER_ACTIONS.includes(actionKind)) {
        return {
            amount: deposit,
            tokenName: config.tokenName,
        };
    } else if (actionKind === TransactionActionKind.STAKE) {
        return {
            amount: stake,
        };
    }
}
