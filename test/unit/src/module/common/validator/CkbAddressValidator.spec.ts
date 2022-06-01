import { CkbAddressValidator } from "module/common/validator/CkbAddressValidator";
import { Environments } from "module/sdk";

describe("CkbAddressValidator tests", () => {
    test("Address is correct", () => {
        expect(
            new CkbAddressValidator(Environments.Mainnet).validate(
                "ckb1qzda0cr08m85hc8jlnfp3zer7xulejywt49kt2rr0vthywaa50xwsqwau7qpcpealv6xf3a37pdcq6ajhwuyaxgs5g955",
            ),
        ).toBe(true);
    });

    test("Address is wrong", () => {
        expect(new CkbAddressValidator(Environments.Mainnet).validate("rIamWr0ng")).toBe(false);
    });
});
