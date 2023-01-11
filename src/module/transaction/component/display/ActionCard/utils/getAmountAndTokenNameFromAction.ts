import { Action, ActionKind, EnhancedTransactionActionKind, TransactionActionKind } from "near-peersyst-sdk";

export const TRANSFER_ACTIONS: ActionKind[] = [EnhancedTransactionActionKind.TRANSFER_RECEIVE, EnhancedTransactionActionKind.TRANSFER_SEND];

export interface GetAmountAndTokenNameFromActionResult {
    amount: string | undefined;
    tokenName?: string;
}

export default function getAmountAndTokenNameFromAction({
    actionKind,
    deposit,
    stake,
}: Action): GetAmountAndTokenNameFromActionResult | undefined {
    if (TRANSFER_ACTIONS.includes(actionKind)) {
        return {
            amount: deposit,
            tokenName: "token",
        };
    } else if (actionKind === TransactionActionKind.STAKE) {
        return {
            amount: stake,
        };
    }
}
