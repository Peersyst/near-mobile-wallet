import { render, translate } from "test-utils";
import * as UseCreateWalletState from "module/wallet/hook/useCreateWallet";
import { fireEvent, waitFor } from "@testing-library/react-native";
import SetWalletPinScreen from "module/wallet/screen/SetWalletPinScreen";
import { UseCreateWalletMock } from "test-mocks";

describe("SetWalletPin tests", () => {
    test("Renders correctly", () => {
        const screen = render(<SetWalletPinScreen onCancel={() => undefined} onSuccess={() => undefined} />);
        expect(screen.getByText(translate("enter_your_pin").toUpperCase())).toBeDefined();
        expect(screen.getByText("1")).toBeDefined();
        expect(screen.getByText("Cancel")).toBeDefined();
    });

    test("Sets pin correctly", async () => {
        const { setPin } = new UseCreateWalletMock();
        const handleSuccess = jest.fn();

        const screen = render(<SetWalletPinScreen onCancel={() => undefined} onSuccess={handleSuccess} />);

        fireEvent.press(screen.getByText("1"));
        fireEvent.press(screen.getByText("2"));
        fireEvent.press(screen.getByText("3"));
        fireEvent.press(screen.getByText("4"));
        expect(screen.getByText(translate("repeat_pin").toUpperCase())).toBeDefined();
        fireEvent.press(screen.getByText("1"));
        fireEvent.press(screen.getByText("2"));
        fireEvent.press(screen.getByText("3"));
        fireEvent.press(screen.getByText("4"));
        expect(setPin).toHaveBeenCalledWith("1234");
        await waitFor(() => expect(handleSuccess).toHaveBeenCalled());
    });

    test("Sets pin incorrectly", async () => {
        const screen = render(<SetWalletPinScreen onCancel={() => undefined} onSuccess={() => undefined} />);

        fireEvent.press(screen.getByText("1"));
        fireEvent.press(screen.getByText("2"));
        fireEvent.press(screen.getByText("3"));
        fireEvent.press(screen.getByText("4"));
        expect(screen.getByText(translate("repeat_pin").toUpperCase())).toBeDefined();
        fireEvent.press(screen.getByText("1"));
        fireEvent.press(screen.getByText("2"));
        fireEvent.press(screen.getByText("3"));
        fireEvent.press(screen.getByText("5"));
        expect(screen.getByText(translate("pins_did_not_match").toUpperCase())).toBeDefined();
    });

    test("Cancel navigates back", async () => {
        const handleCancel = jest.fn();

        const screen = render(<SetWalletPinScreen onSuccess={() => undefined} onCancel={handleCancel} />);

        const cancelButton = screen.getByText(translate("cancel"));
        fireEvent.press(cancelButton);
        expect(handleCancel).toHaveBeenCalled();
    });
});
