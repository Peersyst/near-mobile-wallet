import { EnhancedTransactionActionKind, TransactionActionKind } from "near-peersyst-sdk";
import { ArrowDownCircleIcon, ArrowUpCircleIcon, NearIcon, UserAddIcon, UserDeleteIcon, CodeIcon, LockIcon, UsersIcon } from "icons";
import { ActionIcon } from "./ActionIcon.types";

export const ACTION_ICONS: ActionIcon = {
    [TransactionActionKind.STAKE]: {
        Icon: NearIcon,
        active: true,
    },
    [TransactionActionKind.CREATE_ACCOUNT]: {
        Icon: UserAddIcon,
        active: true,
    },
    [TransactionActionKind.DELETE_ACCOUNT]: {
        Icon: UserDeleteIcon,
        active: false,
    },
    [TransactionActionKind.DEPLOY_CONTRACT]: {
        Icon: CodeIcon,
        active: true,
    },
    [TransactionActionKind.FUNCTION_CALL]: {
        Icon: CodeIcon,
        active: true,
    },
    [TransactionActionKind.ADD_KEY]: {
        Icon: LockIcon,
        active: true,
    },
    [TransactionActionKind.DELETE_KEY]: {
        Icon: LockIcon,
        active: false,
    },
    [EnhancedTransactionActionKind.TRANSFER_RECEIVE]: {
        Icon: ArrowDownCircleIcon,
        active: true,
    },
    [EnhancedTransactionActionKind.TRANSFER_SEND]: {
        Icon: ArrowUpCircleIcon,
        active: false,
    },
    [EnhancedTransactionActionKind.DELEGATE_CALL]: {
        Icon: UsersIcon,
        active: false,
    },
};
