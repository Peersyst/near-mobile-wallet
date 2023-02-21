import SecuritySettingsScreen from "module/settings/screen/SecuritySettingsScreen";
import { fireEvent, render, SuccessApiCall, translate } from "test-utils";
import { WalletStorage } from "module/wallet/WalletStorage";
import { SettingsStorage } from "module/settings/SettingsStorage";
import { waitFor } from "@testing-library/react-native";
import { UseModalMock, UseServiceInstanceMock, UseWalletStateMock } from "test-mocks";

describe("Test for the SecuritySettingsScreen", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", () => {
        const screen = render(<SecuritySettingsScreen />);
        expect(screen.getByText(translate("change_passcode")));
    });

    test("Open confirm modal to update pin", () => {
        new UseWalletStateMock();
        new UseServiceInstanceMock();
        const { showModal } = new UseModalMock();
        const screen = render(<SecuritySettingsScreen />);
        const button = screen.getByText(translate("change_passcode"));
        fireEvent.press(button);
        expect(showModal).toHaveBeenCalled();
    });

    test("Deletes data", async () => {
        const resetWalletState = jest.fn();
        new UseWalletStateMock({ reset: resetWalletState });
        new UseServiceInstanceMock();
        const clearWalletStorage = jest.spyOn(WalletStorage, "clearAll").mockReturnValue(SuccessApiCall(undefined));
        jest.spyOn(WalletStorage, "getPin").mockReturnValue(SuccessApiCall("1234"));
        const clearSettingsStorage = jest.spyOn(SettingsStorage, "clear").mockReturnValue(SuccessApiCall(undefined));
        const screen = render(<SecuritySettingsScreen />);
        const button = screen.getByText(translate("delete_data"));
        fireEvent.press(button);
        expect(screen.getByText(translate("delete_data_text"))).toBeDefined();
        fireEvent.press(screen.getByText(translate("delete")));
        expect(screen.getByText(translate("enter_your_pin").toUpperCase())).toBeDefined();
        for (let i = 1; i < 5; i++) fireEvent.press(screen.getByText(i.toString()));
        await waitFor(() => expect(clearWalletStorage).toHaveBeenCalled());
        await waitFor(() => expect(clearSettingsStorage).toHaveBeenCalled());
        await waitFor(() => expect(resetWalletState).toHaveBeenCalled());
    });
});
