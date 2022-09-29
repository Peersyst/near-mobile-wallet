import { TransactionType } from "ckb-peersyst-sdk";
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from "icons";

interface TxIconUtils {
    Icon: typeof ArrowUpCircleIcon;
    active: boolean;
}

export const getTxIconUtils: Partial<Record<TransactionType, TxIconUtils>> = {
    [TransactionType.SEND_NATIVE_TOKEN]: {
        Icon: ArrowUpCircleIcon,
        active: false,
    },
    [TransactionType.RECEIVE_NATIVE_TOKEN]: {
        Icon: ArrowDownCircleIcon,
        active: true,
    },
};
