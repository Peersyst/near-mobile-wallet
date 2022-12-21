import { ArrowUpCircleIcon } from "module/common/icons/ArrowUpCircleIcon";
import { EnhancedTransactionActionKind } from "../ActionCard/ActionCard.types";

export interface TxIcon {
    Icon: typeof ArrowUpCircleIcon;
    active: boolean;
}

export interface ActionIconProps {
    actionKind: EnhancedTransactionActionKind;
}

export interface ActionIconCompponentProps {
    active?: boolean;
}
