import { TransactionType } from "ckb-peersyst-sdk";
import getTransactionLabel from "module/transaction/component/display/TransactionLabel/utils/getTransactionLabel";
import { translate } from "test-utils";

describe("getTransactionLabel tests", () => {
    test("Returns sent", () => {
        expect(getTransactionLabel(TransactionType.SEND_CKB, translate)).toEqual(translate("sent"));
        expect(getTransactionLabel(TransactionType.SEND_TOKEN, translate)).toEqual(translate("sent"));
    });

    test("Returns sent nft", () => {
        expect(getTransactionLabel(TransactionType.SEND_NFT, translate)).toEqual(translate("sent_nft"));
    });

    test("Returns DAO deposit", () => {
        expect(getTransactionLabel(TransactionType.DEPOSIT_DAO, translate)).toEqual(translate("DAO_deposit"));
    });

    test("Returns received", () => {
        expect(getTransactionLabel(TransactionType.RECEIVE_CKB, translate)).toEqual(translate("received"));
        expect(getTransactionLabel(TransactionType.RECEIVE_TOKEN, translate)).toEqual(translate("received"));
    });

    test("Returns received nft", () => {
        expect(getTransactionLabel(TransactionType.RECEIVE_NFT, translate)).toEqual(translate("received_nft"));
    });

    test("Returns DAO withdrawal", () => {
        expect(getTransactionLabel(TransactionType.UNLOCK_DAO, translate)).toEqual(translate("DAO_withdrawal"));
    });

    test("Returns smart contract", () => {
        expect(getTransactionLabel(TransactionType.SMART_CONTRACT_SEND, translate)).toEqual(translate("smart_contract"));
        expect(getTransactionLabel(TransactionType.SMART_CONTRACT_RECEIVE, translate)).toEqual(translate("smart_contract"));
    });

    test("Returns unlock DAO", () => {
        expect(getTransactionLabel(TransactionType.WITHDRAW_DAO, translate)).toEqual(translate("unlock_DAO"));
    });
});
