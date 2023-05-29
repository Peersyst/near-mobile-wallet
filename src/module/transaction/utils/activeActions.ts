import { EnhancedTransactionActionKind, TransactionActionKind, ActionKind } from "near-peersyst-sdk";

export const ACTIVE_ACTIONS: ActionKind[] = [
    TransactionActionKind.STAKE,
    TransactionActionKind.CREATE_ACCOUNT,
    TransactionActionKind.DEPLOY_CONTRACT,
    TransactionActionKind.FUNCTION_CALL,
    TransactionActionKind.ADD_KEY,
    EnhancedTransactionActionKind.TRANSFER_RECEIVE,
];
