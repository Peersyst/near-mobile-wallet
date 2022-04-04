import getTransactionLabel from "module/transaction/component/display/TransactionLabel/utils/getTransactionLabel";
import { TransactionType } from "module/transaction/types";
import { translate } from "locale";

describe("getTransactionLabel tests", () => {
    test("Returns sent", () => {
        expect(getTransactionLabel(TransactionType.SEND_CKB)).toEqual(translate("sent"));
        expect(getTransactionLabel(TransactionType.SEND_TOKEN)).toEqual(translate("sent"));
    });

    test("Returns sent nft", () => {
        expect(getTransactionLabel(TransactionType.SEND_NFT)).toEqual(translate("sent_nft"));
    });

    test("Returns dao deposit", () => {
        expect(getTransactionLabel(TransactionType.DEPOSIT_DAO)).toEqual(translate("dao_deposit"));
    });

    test("Returns received", () => {
        expect(getTransactionLabel(TransactionType.RECEIVE_CKB)).toEqual(translate("received"));
        expect(getTransactionLabel(TransactionType.RECEIVE_TOKEN)).toEqual(translate("received"));
    });

    test("Returns received nft", () => {
        expect(getTransactionLabel(TransactionType.RECEIVE_NFT)).toEqual(translate("received_nft"));
    });

    test("Returns dao withdrawal", () => {
        expect(getTransactionLabel(TransactionType.WITHDRAW_DAO)).toEqual(translate("dao_withdrawal"));
    });

    test("Returns smart contract", () => {
        expect(getTransactionLabel(TransactionType.SMART_CONTRACT)).toEqual(translate("smart_contract"));
    });

    test("Returns unlock dao", () => {
        expect(getTransactionLabel(TransactionType.UNLOCK_DAO)).toEqual(translate("unlock_dao"));
    });
});
