import getTransactionLabel from "module/transaction/component/display/TransactionLabel/utils/getTransactionLabel";
import { TransactionType } from "@peersyst/ckb-peersyst-sdk";
import { translate } from "locale";

describe("getTransactionLabel tests", () => {
    test("Returns sent", () => {
        expect(getTransactionLabel(TransactionType.SEND_CKB)).toEqual(translate("sent"));
        expect(getTransactionLabel(TransactionType.SEND_TOKEN)).toEqual(translate("sent"));
    });

    test("Returns sent nft", () => {
        expect(getTransactionLabel(TransactionType.SEND_NFT)).toEqual(translate("sent_nft"));
    });

    test("Returns DAO deposit", () => {
        expect(getTransactionLabel(TransactionType.DEPOSIT_DAO)).toEqual(translate("DAO_deposit"));
    });

    test("Returns received", () => {
        expect(getTransactionLabel(TransactionType.RECEIVE_CKB)).toEqual(translate("received"));
        expect(getTransactionLabel(TransactionType.RECEIVE_TOKEN)).toEqual(translate("received"));
    });

    test("Returns received nft", () => {
        expect(getTransactionLabel(TransactionType.RECEIVE_NFT)).toEqual(translate("received_nft"));
    });

    test("Returns DAO withdrawal", () => {
        expect(getTransactionLabel(TransactionType.UNLOCK_DAO)).toEqual(translate("DAO_withdrawal"));
    });

    test("Returns smart contract", () => {
        expect(getTransactionLabel(TransactionType.SMART_CONTRACT_SEND)).toEqual(translate("smart_contract"));
        expect(getTransactionLabel(TransactionType.SMART_CONTRACT_RECEIVE)).toEqual(translate("smart_contract"));
    });

    test("Returns unlock DAO", () => {
        expect(getTransactionLabel(TransactionType.WITHDRAW_DAO)).toEqual(translate("unlock_DAO"));
    });
});
