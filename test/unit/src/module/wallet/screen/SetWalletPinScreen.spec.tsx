import { render } from "test-utils";
import { translate } from "locale";
import * as UseTabs from "module/common/component/base/navigation/Tabs/hook/useTabs";
import * as UseCreateWalletState from "module/wallet/hook/useCreateWallet";
import { fireEvent } from "@testing-library/react-native";
import { CreateWalletScreens } from "module/wallet/CreateWalletNavigatorGroup";
import SetWalletPinScreen from "module/wallet/screen/SetWalletPinScreen";

describe("SetWalletPin tests", () => {
    test("Renders correctly", () => {
        const screen = render(<SetWalletPinScreen />);
        expect(screen.getByText(translate("enter_your_pin"))).toBeDefined();
        expect(screen.getByText("1")).toBeDefined();
        expect(screen.getByText("Cancel")).toBeDefined();
    });

    test("Sets pin correctly", async () => {
        const setTab = jest.fn();
        const setPin = jest.fn();
        jest.spyOn(UseTabs, "default").mockReturnValue([0, setTab]);
        jest.spyOn(UseCreateWalletState, "default").mockReturnValue({
            state: { name: undefined, pin: undefined, mnemonic: undefined },
            setName: jest.fn(),
            setPin,
            setMnemonic: jest.fn(),
        });

        const screen = render(<SetWalletPinScreen />);
        fireEvent.press(screen.getByText("1"));
        fireEvent.press(screen.getByText("2"));
        fireEvent.press(screen.getByText("3"));
        fireEvent.press(screen.getByText("4"));
        expect(screen.getByText(translate("repeat_pin"))).toBeDefined();
        fireEvent.press(screen.getByText("1"));
        fireEvent.press(screen.getByText("2"));
        fireEvent.press(screen.getByText("3"));
        fireEvent.press(screen.getByText("4"));
        expect(setPin).toHaveBeenCalledWith("1234");
        expect(setTab).toHaveBeenCalledWith(CreateWalletScreens.WALLET_ADVISES);
    });

    test("Sets pin incorrectly", async () => {
        const screen = render(<SetWalletPinScreen />);
        fireEvent.press(screen.getByText("1"));
        fireEvent.press(screen.getByText("2"));
        fireEvent.press(screen.getByText("3"));
        fireEvent.press(screen.getByText("4"));
        expect(screen.getByText(translate("repeat_pin"))).toBeDefined();
        fireEvent.press(screen.getByText("1"));
        fireEvent.press(screen.getByText("2"));
        fireEvent.press(screen.getByText("3"));
        fireEvent.press(screen.getByText("5"));
        expect(screen.getByText(translate("pins_did_not_match"))).toBeDefined();
    });

    test("Cancel navigates back", async () => {
        const setTab = jest.fn();
        jest.spyOn(UseTabs, "default").mockReturnValue([0, setTab]);

        const screen = render(<SetWalletPinScreen />);
        const cancelButton = screen.getByText(translate("cancel"));
        fireEvent.press(cancelButton);
        expect(setTab).toHaveBeenCalledWith(CreateWalletScreens.SET_WALLET_NAME);
    });
});
