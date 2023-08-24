import SignModalScaffold from "module/signer/components/layout/SignModalScaffold/SignModalScaffold";
import { fireEvent, render, screen, translate } from "test-utils";

describe("SignModalScaffold", () => {
    test("Renders correctly", () => {
        render(<SignModalScaffold onSign={jest.fn} onReject={jest.fn} />);

        expect(screen.getByRole("button", { name: translate("sign") })).toBeDefined();
        expect(screen.getByRole("button", { name: translate("reject") })).toBeDefined();
    });

    test("Calls onSign when sign button is pressed", () => {
        const onSignMock = jest.fn();

        render(<SignModalScaffold onSign={onSignMock} onReject={jest.fn} />);
        const signButton = screen.getByRole("button", { name: translate("sign") });

        fireEvent.press(signButton);

        expect(onSignMock).toHaveBeenCalledTimes(1);
    });

    test("Calls onReject when sign button is pressed", () => {
        const onRejectMock = jest.fn();

        render(<SignModalScaffold onSign={jest.fn} onReject={onRejectMock} />);
        const signButton = screen.getByRole("button", { name: translate("reject") });

        fireEvent.press(signButton);

        expect(onRejectMock).toHaveBeenCalledTimes(1);
    });
});
