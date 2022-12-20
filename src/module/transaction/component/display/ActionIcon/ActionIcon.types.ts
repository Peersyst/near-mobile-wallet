import { ArrowUpCircleIcon } from "module/common/icons/ArrowUpCircleIcon";
import { TransactionActionKind } from "near-peersyst-sdk";

export interface TxIcon {
    Icon: typeof ArrowUpCircleIcon;
    active: boolean;
}

export type ActionIcon = Exclude<keyof typeof TransactionActionKind, "TRANSFER"> | "TRANSFER_RECEIVE" | "TRANSFER_SEND";

export interface ActionIconProps {
    type: ActionIcon;
}

export interface ActionIconCompponentProps {
    active?: boolean;
}
