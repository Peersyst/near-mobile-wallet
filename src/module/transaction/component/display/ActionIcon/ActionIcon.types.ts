import { ArrowUpCircleIcon } from "module/common/icons/ArrowUpCircleIcon";
import { ActionKind } from "near-peersyst-sdk";

export interface TxIcon {
    Icon: typeof ArrowUpCircleIcon;
    active: boolean;
}

export interface ActionIconProps {
    actionKind: ActionKind;
}

export interface ActionIconCompponentProps {
    active?: boolean;
}

export type ActionIcon = Record<ActionKind, TxIcon>;
