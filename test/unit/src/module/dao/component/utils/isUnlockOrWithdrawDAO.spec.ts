import { isUnlockOrWithdrawDAO } from "module/dao/utils/isUnlockOrWithdrawDAO";
import { TransactionType } from "ckb-peersyst-sdk";

describe("isUnlockOrWithdrawDAO tests", () => {
    test("Returns true if the type is from a DAO unlock or withdraw tx", () => {
        expect(isUnlockOrWithdrawDAO(TransactionType.UNLOCK_DAO)).toEqual(true);
        expect(isUnlockOrWithdrawDAO(TransactionType.WITHDRAW_DAO)).toEqual(true);
    });

    test("Returns false if the type is not from a DAO unlock tx", () => {
        expect(isUnlockOrWithdrawDAO(TransactionType.RECEIVE_NATIVE_TOKEN)).toEqual(false);
    });
});
