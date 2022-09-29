import { TransactionType } from "ckb-peersyst-sdk";
import { FullTransaction } from "module/common/service/CkbSdkService.types";
import { TFunction } from "react-i18next";

export default function (type: FullTransaction["type"], translate: TFunction<"translation">): string {
    switch (type) {
        case TransactionType.SEND_NATIVE_TOKEN:
        case TransactionType.SEND_TOKEN:
            return translate("sent");
        case TransactionType.SEND_NFT:
            return translate("sent_nft");
        case TransactionType.DEPOSIT_DAO:
            return translate("DAO_deposit");
        case TransactionType.RECEIVE_NATIVE_TOKEN:
        case TransactionType.RECEIVE_TOKEN:
            return translate("received");
        case TransactionType.RECEIVE_NFT:
            return translate("received_nft");
        case TransactionType.WITHDRAW_DAO:
            return translate("unlock_DAO");
        case TransactionType.SMART_CONTRACT_SEND:
        case TransactionType.SMART_CONTRACT_RECEIVE:
            return translate("smart_contract");
        case TransactionType.UNLOCK_DAO:
            return translate("DAO_withdrawal");
    }
}
