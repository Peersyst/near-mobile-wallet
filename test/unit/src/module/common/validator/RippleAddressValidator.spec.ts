import { RippleAddressValidator } from "module/common/validator/RippleAddressValidator";

describe("RippleAddressValidator tests", () => {
    test("Address is correct", () => {
        expect(new RippleAddressValidator().validate("rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn")).toBe(true);
    });

    test("Address is wrong", () => {
        expect(new RippleAddressValidator().validate("rIamWr0ng")).toBe(false);
    });
});
