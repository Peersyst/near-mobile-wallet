import { translate } from "locale";
import UpdatePinScreen from "module/settings/screen/UpdatePinScreen";
import { fireEvent, render } from "test-utils";
import * as Recoil from "recoil";
import * as Navigation from "@react-navigation/native";
import { MainBottomScreens } from "module/main/component/navigation/MainBottomNavigatorGroup/MainBottomNavigatorGroup";
import * as UseCreateWalletState from "module/wallet/hook/useCreateWallet";

describe("Test for the UpdatePinScreen", () => {
    test("Renders correctly", () => {
        const screen = render(<UpdatePinScreen />);
        expect(screen.getByText(translate("update_your_pin")));
        expect(screen.getAllByTestId("BackIcon"));
        expect(screen.getByText(translate("enter_new_pin")));
    });
    test("Updates pin correctly", () => {
        const setPin = jest.fn();
        jest.spyOn(UseCreateWalletState, "default").mockReturnValue({
            state: { name: undefined, pin: undefined, mnemonic: undefined },
            setName: jest.fn(),
            setPin,
            setMnemonic: jest.fn(),
        });
        const setMockedState = jest.fn();
        jest.spyOn(Recoil, "useSetRecoilState").mockReturnValue(setMockedState);
        const mockedNavigate = jest.fn();
        jest.spyOn(Navigation, "useNavigation").mockReturnValue({ navigate: mockedNavigate });

        const screen = render(<UpdatePinScreen />);

        fireEvent.press(screen.getByText("1"));
        fireEvent.press(screen.getByText("2"));
        fireEvent.press(screen.getByText("3"));
        fireEvent.press(screen.getByText("4"));
        expect(screen.getByText(translate("repeat_pin"))).toBeDefined();
        fireEvent.press(screen.getByText("1"));
        fireEvent.press(screen.getByText("2"));
        fireEvent.press(screen.getByText("3"));
        fireEvent.press(screen.getByText("4"));

        expect(setMockedState).toHaveBeenCalled();
        expect(mockedNavigate).toHaveBeenCalledWith(MainBottomScreens.SECURITY_SETTINGS);
    });
    test("If pin is not correct no update state", () => {
        const setPin = jest.fn();
        jest.spyOn(UseCreateWalletState, "default").mockReturnValue({
            state: { name: undefined, pin: undefined, mnemonic: undefined },
            setName: jest.fn(),
            setPin,
            setMnemonic: jest.fn(),
        });
        const setMockedState = jest.fn();
        jest.spyOn(Recoil, "useSetRecoilState").mockReturnValue(setMockedState);
        const mockedNavigate = jest.fn();
        jest.spyOn(Navigation, "useNavigation").mockReturnValue({ navigate: mockedNavigate });

        const screen = render(<UpdatePinScreen />);

        fireEvent.press(screen.getByText("1"));
        fireEvent.press(screen.getByText("2"));
        fireEvent.press(screen.getByText("3"));
        fireEvent.press(screen.getByText("4"));
        expect(screen.getByText(translate("repeat_pin"))).toBeDefined();
        fireEvent.press(screen.getByText("2"));
        fireEvent.press(screen.getByText("2"));
        fireEvent.press(screen.getByText("3"));
        fireEvent.press(screen.getByText("4"));

        expect(setMockedState).not.toHaveBeenCalled();
        expect(mockedNavigate).not.toHaveBeenCalledWith(MainBottomScreens.SECURITY_SETTINGS);
    });
});
