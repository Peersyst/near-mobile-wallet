import { TransactionType } from "ckb-peersyst-sdk";

export default function (type: TransactionType): boolean {
    switch (type) {
        case TransactionType.SEND_NATIVE_TOKEN:
        case TransactionType.RECEIVE_NATIVE_TOKEN:
            return true;
        default:
            return false;
    }
}
