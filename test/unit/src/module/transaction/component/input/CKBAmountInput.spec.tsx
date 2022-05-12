import { translate } from "locale";
import CKBAmountInput from "module/transaction/component/input/CKBAmountInput/CKBAmountInput";
import { fireEvent, render, waitFor } from "test-utils";

describe("CKBAmount Input test", () => {
    test("Renders correctly", async () => {
        const screen = render(<CKBAmountInput amount={""} setAmount={jest.fn()} fee={10} freeBalance={100} />);
        screen.getByPlaceholderText(translate("enter_amount"));
        expect(screen.getByText(translate("transaction_fee", { fee: "10" || "-" }))).toBeDefined();
    });

    test("Updates the setters correctly", async () => {
        const setInput = jest.fn();
        const screen = render(<CKBAmountInput amount={""} setAmount={setInput} freeBalance={200} fee={10} />);
        const amountInput = screen.getByPlaceholderText(translate("enter_amount"));
        screen.getByPlaceholderText(translate("enter_amount"));
        expect(screen.getByText(translate("transaction_fee", { fee: "10" || "-" }))).toBeDefined();
        fireEvent.changeText(amountInput, "100");
        await waitFor(() => expect(setInput).toHaveBeenCalled());
    });
});
