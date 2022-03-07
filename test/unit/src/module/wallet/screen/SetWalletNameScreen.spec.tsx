import { render } from "test-utils";
import SetWalletNameScreen from "module/wallet/screen/SetWalletNameScreen";
import { translate } from "locale";
import * as UseTabs from "module/common/component/base/navigation/Tabs/hook/useTabs";
import * as UseCreateWalletState from "module/wallet/hook/useCreateWallet";
import { fireEvent, waitFor } from "@testing-library/react-native";
import { CreateWalletScreens } from "module/wallet/CreateWalletNavigatorGroup";

describe("SetWalletNameScreen tests", () => {
    test("Renders correctly", () => {
        const screen = render(<SetWalletNameScreen />);
        expect(screen.getByText(translate("set_wallet_name_text"))).toBeDefined();
        expect(screen.getByPlaceholderText(translate("wallet_name"))).toBeDefined();
        expect(screen.getByText(translate("set_pin"))).toBeDefined();
    });

    test("Sets name and navigates to set pin", async () => {
        const setTab = jest.fn();
        const setName = jest.fn();
        jest.spyOn(UseTabs, "default").mockReturnValue([0, setTab]);
        jest.spyOn(UseCreateWalletState, "default").mockReturnValue({
            state: { name: undefined, pin: undefined, mnemonic: undefined },
            setName,
            setPin: jest.fn(),
            setMnemonic: jest.fn(),
        });

        const screen = render(<SetWalletNameScreen />);
        const nameInput = screen.getByPlaceholderText(translate("wallet_name"));
        fireEvent.changeText(nameInput, "Wallet Name");
        const setPinButton = screen.getByText(translate("set_pin"));
        fireEvent.press(setPinButton);
        await waitFor(() => expect(setName).toHaveBeenCalledWith("Wallet Name"));
        expect(setTab).toHaveBeenCalledWith(CreateWalletScreens.SET_WALLET_PIN);
    });
});
