import { config } from "config";
import NEARAmountInput from "module/transaction/component/input/AssetAmountInput/NEARAmountInput/NEARAmountInput";
import { AccountBalanceMock, UseGetBalanceMock } from "test-mocks";
import { fireEvent, render, screen, translate, waitFor } from "test-utils";

describe("NEARAmountInput Test", () => {
    test("Renders and validates correctly", async () => {
        const balance = new AccountBalanceMock({ available: "10" });
        new UseGetBalanceMock({ balance });
        render(<NEARAmountInput index={0} placeholder="Enter amount" />);
        //Wait untill the balance is loaded
        await waitFor(() => expect(screen.getByText(config.tokenName)).toBeDefined());
        const input = screen.getByPlaceholderText("Enter amount");
        fireEvent.changeText(input, "11");
        expect(screen.getByText(translate("invalid_number_lt", { n: "9.99995 NEAR", ns: "error" }))).toBeDefined();
        fireEvent.changeText(input, "9.99995");
        expect(screen.queryByText(translate("invalid_number_lt", { n: "9.99995 NEAR", ns: "error" }))).toBeNull();
        fireEvent.changeText(input, "0");
        expect(screen.getByText(translate("invalid_number_gt", { n: "0 NEAR", ns: "error" }))).toBeDefined();
    });
});
