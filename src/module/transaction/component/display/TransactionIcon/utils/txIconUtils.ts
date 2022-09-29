import { TransactionType } from "ckb-peersyst-sdk";
import { ArrowDownCircleIcon, ArrowUpCircleIcon, NearIcon } from "icons";

interface TxIconUtils {
    Icon: typeof ArrowUpCircleIcon;
    active: boolean;
}

export const TX_ICON_UTILS: Partial<Record<TransactionType, TxIconUtils>> = {
    [TransactionType.SEND_NATIVE_TOKEN]: {
        Icon: ArrowUpCircleIcon,
        active: false,
    },
    [TransactionType.RECEIVE_NATIVE_TOKEN]: {
        Icon: ArrowDownCircleIcon,
        active: true,
    },
    [TransactionType.STAKE]: {
        Icon: NearIcon,
        active: false,
    },
    [TransactionType.UNSTAKE]: {
        Icon: NearIcon,
        active: true,
    },
};
