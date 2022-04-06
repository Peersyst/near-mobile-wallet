import { isDAOTransaction } from "module/transaction/component/utils/isDAOTransaction";
import { TransactionType } from "module/transaction/types";

describe("isDAOTransaction tests", () => {

    test("Returns true if the type is from a DAO tx", () => {
        expect(isDAOTransaction(TransactionType.DEPOSIT_DAO)).toEqual(true)
        expect(isDAOTransaction(TransactionType.UNLOCK_DAO)).toEqual(true)
        expect(isDAOTransaction(TransactionType.WITHDRAW_DAO)).toEqual(true)
    });

    test("Returns false if the type is not from a DAO tx", () => {
        expect(isDAOTransaction(TransactionType.RECEIVE_CKB)).toEqual(false)
        expect(isDAOTransaction(TransactionType.SEND_NFT)).toEqual(false)
    });
});