import { render, translate } from "test-utils";
import PickWalletMnemonicScreen from "module/wallet/screen/PickWalletMnemonicScreen/PickWalletMnemonicScreen";
import * as UseCreateWallet from "module/wallet/hook/useCreateWallet";
import * as Genesys from "@peersyst/react-native-components";
import { fireEvent } from "@testing-library/react-native";

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
        jest.spyOn(Genesys, "useToast").mockReturnValue({
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
