import { render } from "test-utils";
import PickWalletMnemonicScreen from "module/wallet/screen/PickWalletMnemonicScreen";
import * as UseCreateWallet from "module/wallet/hook/useCreateWallet";
import * as UseTabs from "module/common/component/base/navigation/Tabs/hook/useTabs";
import * as UseToast from "module/common/component/base/feedback/ToastProvider/hooks/useToast";
import { fireEvent } from "@testing-library/react-native";
import { CreateWalletScreens } from "module/wallet/navigator/CreateWalletNavigatorGroup";
import { translate } from "locale";

describe("PickWalletMnemonicScreen tests", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    test("Navigates to CreateWalletSuccess if correct", () => {
        jest.spyOn(UseCreateWallet, "default").mockReturnValue({
            state: { name: "wallet", pin: "1234", mnemonic: ["pizza", "watermelon", "lemon"] },
            setPin: jest.fn(),
            setName: jest.fn(),
            setMnemonic: jest.fn(),
        });
        const setTab = jest.fn();
        jest.spyOn(UseTabs, "default").mockReturnValue([0, setTab]);
        const screen = render(<PickWalletMnemonicScreen />);

        fireEvent.press(screen.getByText("pizza"));
        fireEvent.press(screen.getByText("watermelon"));
        fireEvent.press(screen.getByText("lemon"));

        expect(setTab).toHaveBeenCalledWith(CreateWalletScreens.CREATE_WALLET_SUCCESS);
    });

    test("Shows toast if not correct", () => {
        jest.spyOn(UseCreateWallet, "default").mockReturnValue({
            state: { name: "wallet", pin: "1234", mnemonic: ["pizza", "watermelon", "lemon"] },
            setPin: jest.fn(),
            setName: jest.fn(),
            setMnemonic: jest.fn(),
        });
        const showToast = jest.fn();
        jest.spyOn(UseToast, "useToast").mockReturnValue({
            showToast,
            hideToast: jest.fn(),
            toastActive: false,
        });
        const screen = render(<PickWalletMnemonicScreen />);

        fireEvent.press(screen.getByText("pizza"));
        fireEvent.press(screen.getByText("lemon"));
        fireEvent.press(screen.getByText("watermelon"));

        expect(showToast).toHaveBeenCalledWith(translate("incorrect_mnemonic"), { type: "error" });
    });
});
