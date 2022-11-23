import TokenAmountInput from "module/transaction/component/input/TokenAmountInput/TokenAmountInput";
import { fireEvent, render, waitFor, translate } from "test-utils";
import { config } from "config";

describe("TokenAmountInput test", () => {
    test("Renders correctly", async () => {
        const screen = render(<TokenAmountInput amount={""} setAmount={jest.fn()} fee={10} freeBalance={100} />);
        screen.getByPlaceholderText(translate("enter_amount"));
        expect(screen.getByText(translate("transaction_fee", { fee: "10", token: config.tokenName }))).toBeDefined();
    });

    test("Updates the setters correctly", async () => {
        const setInput = jest.fn();
        const screen = render(<TokenAmountInput amount={""} setAmount={setInput} freeBalance={200} fee={10} />);
        const amountInput = screen.getByPlaceholderText(translate("enter_amount"));
        screen.getByPlaceholderText(translate("enter_amount"));
        expect(screen.getByText(translate("transaction_fee", { fee: "10", token: config.tokenName }))).toBeDefined();
        fireEvent.changeText(amountInput, "100");
        await waitFor(() => expect(setInput).toHaveBeenCalled());
    });
});
