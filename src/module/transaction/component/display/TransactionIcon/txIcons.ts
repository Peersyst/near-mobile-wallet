import { TransactionType } from "ckb-peersyst-sdk";
import { ArrowDownCircleIcon, ArrowUpCircleIcon, DatabaseIcon } from "icons";

interface TxIcon {
    Icon: typeof ArrowUpCircleIcon;
    active: boolean;
}

export const TX_ICON: Partial<Record<TransactionType, TxIcon>> = {
    [TransactionType.SEND_NATIVE_TOKEN]: {
        Icon: ArrowUpCircleIcon,
        active: false,
    },
    [TransactionType.RECEIVE_NATIVE_TOKEN]: {
        Icon: ArrowDownCircleIcon,
        active: true,
    },
};
