import { isDAODeposit } from "module/dao/utils/isDAODeposit";
import { TransactionType } from "ckb-peersyst-sdk";

describe("isDAODeposit tests", () => {
    test("Returns true if the type is from a DAO deposit tx", () => {
        expect(isDAODeposit(TransactionType.DEPOSIT_DAO)).toEqual(true);
    });

    test("Returns false if the type is not from a DAO deposit tx", () => {
        expect(isDAODeposit(TransactionType.RECEIVE_NATIVE_TOKEN)).toEqual(false);
        expect(isDAODeposit(TransactionType.WITHDRAW_DAO)).toEqual(false);
    });
});
