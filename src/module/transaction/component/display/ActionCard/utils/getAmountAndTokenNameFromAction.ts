import { Action, ActionKind, EnhancedTransactionActionKind, TransactionActionKind } from "near-peersyst-sdk";
import { config } from "config";

export const TRANSFER_ACTIONS: ActionKind[] = [EnhancedTransactionActionKind.TRANSFER_RECEIVE, EnhancedTransactionActionKind.TRANSFER_SEND];

export interface GetAmountAndTokenNameFromAction {
    amount: string | undefined;
    tokenName?: string;
}

export default function getAmountAndTokenNameFromAction({
    actionKind,
    deposit,
    stake,
}: Action): GetAmountAndTokenNameFromAction | undefined {
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
