import { TransactionType } from "@peersyst/ckb-peersyst-sdk";

export default function (type: TransactionType): boolean {
    switch (type) {
        case TransactionType.SEND_CKB:
        case TransactionType.RECEIVE_CKB:
            return true;
        default:
            return false;
    }
}
