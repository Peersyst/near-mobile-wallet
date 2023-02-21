import { ArrowUpCircleIcon } from "module/common/icons/ArrowUpCircleIcon";
import { ActionKind } from "near-peersyst-sdk";

export interface TxIcon {
    Icon: typeof ArrowUpCircleIcon;
    active: boolean;
}

export type ActionIconType = ActionKind;

export interface ActionIconProps {
    type: ActionIconType;
}

export type ActionIcon = Record<ActionIconType, TxIcon>;
