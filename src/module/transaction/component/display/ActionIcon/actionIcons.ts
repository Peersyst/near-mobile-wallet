import { TransactionActionKind } from "near-peersyst-sdk";
import { ArrowDownCircleIcon, ArrowUpCircleIcon, NearIcon, UserAddIcon, UserDeleteIcon, CodeIcon, LockIcon } from "icons";
import { ActionIcon, TxIcon } from "./ActionIcon.types";

export const ACTION_ICONS: Partial<Record<ActionIcon, TxIcon>> = {
    [TransactionActionKind.STAKE]: {
        Icon: NearIcon,
        active: false,
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
    ["TRANSFER_RECEIVE"]: {
        Icon: ArrowDownCircleIcon,
        active: true,
    },
    ["TRANSFER_SEND"]: {
        Icon: ArrowUpCircleIcon,
        active: false,
    },
};
