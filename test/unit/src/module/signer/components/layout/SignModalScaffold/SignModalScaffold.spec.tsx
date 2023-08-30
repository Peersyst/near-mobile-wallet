import SignModalScaffold from "module/signer/components/layout/SignModalScaffold/SignModalScaffold";
import { fireEvent, render, screen, translate } from "test-utils";

describe("SignModalScaffold", () => {
    test("Renders correctly", () => {
        render(<SignModalScaffold onSign={jest.fn} onReject={jest.fn} />);

        expect(screen.getByText(translate("slideToAccept"))).toBeDefined();
        expect(screen.getByRole("button", { name: translate("reject") })).toBeDefined();
    });

    test("Calls onReject when sign button is pressed", () => {
        const onRejectMock = jest.fn();

        render(<SignModalScaffold onSign={jest.fn} onReject={onRejectMock} />);
        const signButton = screen.getByRole("button", { name: translate("reject") });

        fireEvent.press(signButton);

        expect(onRejectMock).toHaveBeenCalledTimes(1);
    });
});
