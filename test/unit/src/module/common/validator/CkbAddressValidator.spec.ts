import { CkbAddressValidator } from "module/common/validator/CkbAddressValidator";

describe("CkbAddressValidator tests", () => {
    test("Address is correct", () => {
        expect(new CkbAddressValidator().validate("ckb1qyqt5m9v5rr73ylyztt8yexzav4plsfugm7s9xj2fc")).toBe(true);
    });

    test("Address is wrong", () => {
        expect(new CkbAddressValidator().validate("rIamWr0ng")).toBe(false);
    });
});
