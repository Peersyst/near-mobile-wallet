import { config } from "config";
import NEARAmountTextField from "module/transaction/component/input/AssetAmountTextField/NEARAmountTextField/NEARAmountTextField";
import { AccountBalanceMock, UseGetBalanceMock } from "test-mocks";
import { fireEvent, render, screen, translate, waitFor } from "test-utils";

describe("NEARAmountTextField Test", () => {
    test("Renders and validates correctly", async () => {
        const balance = new AccountBalanceMock({ available: "10" });
        new UseGetBalanceMock({ balance });
        render(<NEARAmountTextField index={0} placeholder="Enter amount" />);
        //Wait untill the balance is loaded
        await waitFor(() => expect(screen.getByText(config.tokenName)).toBeDefined());
        const input = screen.getByPlaceholderText("Enter amount");
        fireEvent.changeText(input, "11");
        expect(screen.getByText(translate("invalid_number_lte", { n: "9.99995 NEAR", ns: "error" }))).toBeDefined();
        fireEvent.changeText(input, "9.99995");
        expect(screen.queryByText(translate("invalid_number_lt", { n: "9.99995 NEAR", ns: "error" }))).toBeNull();
        fireEvent.changeText(input, "0");
        expect(screen.getByText(translate("invalid_number_gt", { n: "0 " + config.tokenName, ns: "error" }))).toBeDefined();
        //Allow min amount in NEAR
        fireEvent.changeText(
            input,
            "0." +
                Array(24 - 1)
                    .fill(0)
                    .join("") +
                "1",
        );
        expect(screen.queryByText(translate("invalid_number_gt", { n: "0 " + config.tokenName, ns: "error" }))).toBeNull();
        //Do not allow one decimal more than 24
        fireEvent.changeText(input, "0." + Array(24).fill(0).join("") + "1");
        expect(screen.getByText(translate("invalid_number_gt", { n: "0 " + config.tokenName, ns: "error" }))).toBeDefined();
    });
});
