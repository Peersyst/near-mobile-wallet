import { TransactionActionKind } from "near-peersyst-sdk";
import { AddedTransactionActionKind, EnhancedTransactionAction, EnhancedTransactionActionKind } from "../ActionCard.types";

export const TRANSFER_ACTIONS: EnhancedTransactionActionKind[] = [
    AddedTransactionActionKind.TRANSFER_RECEIVE,
    AddedTransactionActionKind.TRANSFER_SEND,
];

export default function getAmountFromAction({ actionKind, deposit, stake }: EnhancedTransactionAction): string | undefined {
    if (TRANSFER_ACTIONS.includes(actionKind)) {
        return deposit;
    } else if (actionKind === TransactionActionKind.STAKE) {
        return stake;
    }
}
