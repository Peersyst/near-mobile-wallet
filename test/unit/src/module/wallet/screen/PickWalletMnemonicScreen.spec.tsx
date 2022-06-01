import { render } from "test-utils";
import PickWalletMnemonicScreen from "module/wallet/screen/PickWalletMnemonicScreen";
import * as UseCreateWallet from "module/wallet/hook/useCreateWallet";
import * as UseToast from "module/common/component/base/feedback/ToastProvider/hooks/useToast";
import { fireEvent } from "@testing-library/react-native";
import { translate } from "locale";

describe("PickWalletMnemonicScreen tests", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    test("Navigates to CreateWalletSuccess if correct", () => {
        jest.spyOn(UseCreateWallet, "default").mockReturnValue({
            state: { name: "wallet", pin: "1234", mnemonic: ["pizza", "watermelon", "lemon"], colorIndex: undefined },
            setPin: jest.fn(),
            setName: jest.fn(),
            setMnemonic: jest.fn(),
            setColorIndex: jest.fn(),
            reset: jest.fn(),
        });
        const handleSubmit = jest.fn();
        const screen = render(<PickWalletMnemonicScreen onSubmit={handleSubmit} />);

        fireEvent.press(screen.getByText("pizza"));
        fireEvent.press(screen.getByText("watermelon"));
        fireEvent.press(screen.getByText("lemon"));

        expect(handleSubmit).toHaveBeenCalled();
    });

    test("Shows toast if not correct", () => {
        jest.spyOn(UseCreateWallet, "default").mockReturnValue({
            state: { name: "wallet", pin: "1234", mnemonic: ["pizza", "watermelon", "lemon"], colorIndex: undefined },
            setPin: jest.fn(),
            setName: jest.fn(),
            setMnemonic: jest.fn(),
            setColorIndex: jest.fn(),
            reset: jest.fn(),
        });
        const showToast = jest.fn();
        jest.spyOn(UseToast, "useToast").mockReturnValue({
            showToast,
            hideToast: jest.fn(),
            toastActive: false,
        });
        const screen = render(<PickWalletMnemonicScreen onSubmit={jest.fn()} />);

        fireEvent.press(screen.getByText("pizza"));
        fireEvent.press(screen.getByText("lemon"));
        fireEvent.press(screen.getByText("watermelon"));

        expect(showToast).toHaveBeenCalledWith(translate("incorrect_mnemonic"), { type: "error" });
    });
});
