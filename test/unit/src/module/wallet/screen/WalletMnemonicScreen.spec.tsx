import { render } from "test-utils";
import WalletMnemonicScreen from "module/wallet/screen/WalletMnemonicScreen";
import { translate } from "locale";
import { fireEvent } from "@testing-library/react-native";
import * as UseCreateWalletState from "module/wallet/hook/useCreateWallet";
import { WalletService } from "ckb-peersyst-sdk";

describe("WalletMnemonicScreen tests", () => {
    const mnemonicArr = ["witch", "collapse", "practice", "feed", "shame", "open", "despair", "creek", "road", "again", "ice", "least"];

    beforeAll(() => {
        jest.spyOn(WalletService, "createNewMnemonic").mockReturnValue(mnemonicArr.join(" "));
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", () => {
        const screen = render(<WalletMnemonicScreen onNextScreen={jest.fn()} />);

        screen.getByText(translate("keep_this_safe"));

        screen.getByText("witch");
        screen.getByText("despair");
        screen.getByText("road");

        screen.getByText(translate("next"));
    });

    test("Sets wallet mnemonic state and navigates to enter wallet mnemonic", () => {
        const setMnemonic = jest.fn();
        jest.spyOn(UseCreateWalletState, "default").mockReturnValue({
            state: { name: undefined, pin: undefined, mnemonic: undefined, colorIndex: undefined },
            setName: jest.fn(),
            setPin: jest.fn(),
            setMnemonic,
            setColorIndex: jest.fn(),
            reset: jest.fn(),
        });
        const handleNextScreen = jest.fn();

        const screen = render(<WalletMnemonicScreen onNextScreen={handleNextScreen} />);

        const nextButton = screen.getByText(translate("next"));
        fireEvent.press(nextButton);

        expect(setMnemonic).toHaveBeenCalledWith(mnemonicArr);
        expect(handleNextScreen).toHaveBeenCalled();
    });
});
