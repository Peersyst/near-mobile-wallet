import { translate } from "locale";
import SecuritySettingsScreen from "module/settings/screen/SecuritySettingsScreen";
import { fireEvent, render, SuccessApiCall } from "test-utils";
import * as UseModal from "module/common/component/base/feedback/ModalProvider/hooks/useModal";
import { WalletStorage } from "module/wallet/WalletStorage";
import { SettingsStorage } from "module/settings/SettingsStorage";
import { waitFor } from "@testing-library/react-native";
import * as Recoil from "recoil";

describe("Test for the SecuritySettingsScreen", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", () => {
        const screen = render(<SecuritySettingsScreen navigation={jest.fn() as any} />);
        expect(screen.getByText(translate("change_passcode")));
    });
    test("Open confirm modal to update pin", () => {
        const showModal = jest.fn();
        jest.spyOn(UseModal, "useModal").mockReturnValue({ showModal } as any);
        const screen = render(<SecuritySettingsScreen navigation={jest.fn() as any} />);
        const button = screen.getByText(translate("change_passcode"));
        fireEvent.press(button);
        expect(showModal).toHaveBeenCalled();
    });
    test("Deletes data", async () => {
        const clearWalletStorage = jest.spyOn(WalletStorage, "clear").mockReturnValue(SuccessApiCall(undefined));
        jest.spyOn(WalletStorage, "getPin").mockReturnValue(SuccessApiCall("1234"));
        const clearSettingsStorage = jest.spyOn(SettingsStorage, "clear").mockReturnValue(SuccessApiCall(undefined));
        const resetWalletState = jest.fn();
        jest.spyOn(Recoil, "useResetRecoilState").mockReturnValue(resetWalletState);
        const screen = render(<SecuritySettingsScreen navigation={jest.fn() as any} />);
        const button = screen.getByText(translate("delete_data"));
        fireEvent.press(button);
        expect(screen.getByText(translate("delete_data_text"))).toBeDefined();
        fireEvent.press(screen.getByText(translate("delete")));
        expect(screen.getByText(translate("enter_your_pin"))).toBeDefined();
        for (let i = 1; i < 5; i++) fireEvent.press(screen.getByText(i.toString()));
        await waitFor(() => expect(clearWalletStorage).toHaveBeenCalled());
        await waitFor(() => expect(clearSettingsStorage).toHaveBeenCalled());
        await waitFor(() => expect(resetWalletState).toHaveBeenCalled());
    });
});
