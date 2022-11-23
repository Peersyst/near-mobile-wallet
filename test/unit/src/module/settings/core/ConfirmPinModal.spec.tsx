import ConfirmPinModal from "module/settings/components/core/ConfirmPinModal/ConfirmPinModal";
import { fireEvent, render, SuccessApiCall, waitFor, translate } from "test-utils";
import { WalletStorage } from "module/wallet/WalletStorage";

describe("Test for the Confirm Pin Modal", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    test("Renders correctly", () => {
        const screen = render(<ConfirmPinModal onPinConfirmed={jest.fn()} />);
        expect(screen.getByText(translate("confirm_your_pin")));
        expect(screen.getAllByTestId("BackIcon")).toHaveLength(2);
    });
    test("Updates pin correctly", async () => {
        const onPinConfirmed = jest.fn();
        jest.spyOn(WalletStorage, "getPin").mockReturnValue(SuccessApiCall("1234"));
        const screen = render(<ConfirmPinModal onPinConfirmed={onPinConfirmed} />);
        for (let i = 1; i < 5; i++) {
            fireEvent.press(screen.getByText(i.toString()));
        }
        await waitFor(() => expect(onPinConfirmed).toHaveBeenCalled());
    });
    test("Do not update pin if is not typed correctly", async () => {
        const onPinConfirmed = jest.fn();
        jest.spyOn(WalletStorage, "getPin").mockReturnValue(SuccessApiCall("9876"));
        const screen = render(<ConfirmPinModal onPinConfirmed={onPinConfirmed} />);
        for (let i = 1; i < 5; i++) {
            fireEvent.press(screen.getByText(i.toString()));
        }
        await waitFor(() => expect(onPinConfirmed).not.toHaveBeenCalled());
    });
});
