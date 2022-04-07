import { Transaction, TransactionType } from "@peersyst/ckb-peersyst-sdk";
import { BalanceProps } from "module/wallet/component/display/Balance/Balance.types";

export default function (type: Transaction["type"]): BalanceProps["action"] {
    switch (type) {
        case TransactionType.SEND_CKB:
        case TransactionType.SEND_NFT:
        case TransactionType.SEND_TOKEN:
        case TransactionType.DEPOSIT_DAO:
        case TransactionType.UNLOCK_DAO:
        case TransactionType.SMART_CONTRACT_SEND:
            return "subtract";
        case TransactionType.RECEIVE_CKB:
        case TransactionType.RECEIVE_NFT:
        case TransactionType.RECEIVE_TOKEN:
        case TransactionType.WITHDRAW_DAO:
        case TransactionType.SMART_CONTRACT_RECEIVE:
            return "add";
    }
}
