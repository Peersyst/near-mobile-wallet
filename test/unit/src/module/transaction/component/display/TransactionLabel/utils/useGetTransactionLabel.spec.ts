import { TransactionType } from "ckb-peersyst-sdk";
import { FullTransaction } from "module/common/service/CkbSdkService.types";
import useGetTransactionLabel from "module/transaction/component/display/TransactionLabel/hook/useGetTransactionLabel";
import { act } from "react-test-renderer";
import { renderHook, translate } from "test-utils";

const renderUseFormatTimeDAORemainingCycle = (type: FullTransaction["type"]) =>
    renderHook(() => {
        return useGetTransactionLabel(type);
    });

describe("getTransactionLabel tests", () => {
    test("Returns sent", () => {
        expect(renderUseFormatTimeDAORemainingCycle(TransactionType.SEND_CKB).result.current).toEqual(translate("sent"));
        expect(renderUseFormatTimeDAORemainingCycle(TransactionType.SEND_TOKEN).result.current).toEqual(translate("sent"));
    });

    test("Returns sent nft", () => {
        expect(renderUseFormatTimeDAORemainingCycle(TransactionType.SEND_NFT).result.current).toEqual(translate("sent_nft"));
    });

    test("Returns DAO deposit", () => {
        expect(renderUseFormatTimeDAORemainingCycle(TransactionType.DEPOSIT_DAO).result.current).toEqual(translate("DAO_deposit"));
    });

    test("Returns received", () => {
        expect(renderUseFormatTimeDAORemainingCycle(TransactionType.RECEIVE_CKB).result.current).toEqual(translate("received"));
        expect(renderUseFormatTimeDAORemainingCycle(TransactionType.RECEIVE_TOKEN).result.current).toEqual(translate("received"));
    });

    test("Returns received nft", () => {
        expect(renderUseFormatTimeDAORemainingCycle(TransactionType.RECEIVE_NFT).result.current).toEqual(translate("received_nft"));
    });

    test("Returns DAO withdrawal", () => {
        expect(renderUseFormatTimeDAORemainingCycle(TransactionType.UNLOCK_DAO).result.current).toEqual(translate("DAO_withdrawal"));
    });

    test("Returns smart contract", () => {
        expect(renderUseFormatTimeDAORemainingCycle(TransactionType.SMART_CONTRACT_SEND).result.current).toEqual(
            translate("smart_contract"),
        );
        expect(renderUseFormatTimeDAORemainingCycle(TransactionType.SMART_CONTRACT_RECEIVE).result.current).toEqual(
            translate("smart_contract"),
        );
    });

    test("Returns unlock DAO", () => {
        expect(renderUseFormatTimeDAORemainingCycle(TransactionType.WITHDRAW_DAO).result.current).toEqual(translate("unlock_DAO"));
    });
});
