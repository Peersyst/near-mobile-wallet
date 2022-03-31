import { render } from "test-utils";
import EnterWalletMnemonicScreen from "module/wallet/screen/EnterWalletMnemonicScreen";
import { translate } from "locale";
import { fireEvent, waitFor } from "@testing-library/react-native";
import * as UseSetTab from "module/common/component/base/navigation/Tabs/hook/useSetTab";
import * as UseCreateWallet from "module/wallet/hook/useCreateWallet";
import { ImportWalletScreens } from "module/wallet/navigator/ImportWalletNavigatorGroup";

const mnemonic = ["witch", "collapse", "practice", "feed", "shame", "open", "despair", "creek", "road", "again", "ice", "least"];

describe("EnterWalletMnemonicScreen tests", () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Enters mnemonic correctly", async () => {
        const setTab = jest.fn();
        const setMnemonic = jest.fn();
        jest.spyOn(UseSetTab, "default").mockReturnValue(setTab);
        jest.spyOn(UseCreateWallet, "default").mockReturnValue({
            state: { name: "Name", mnemonic: undefined, pin: undefined, colorIndex: undefined },
            setName: jest.fn(),
            setPin: jest.fn(),
            setMnemonic,
            setColorIndex: jest.fn(),
        });

        const screen = render(<EnterWalletMnemonicScreen />);

        const input = screen.getByPlaceholderText(translate("add_a_word"));
        for (const word of mnemonic) {
            fireEvent.changeText(input, word);
            fireEvent(input, "submitEditing", { nativeEvent: { text: word } });
        }

        const button = screen.getByText(translate("set_pin"));
        fireEvent.press(button);
        await waitFor(() => expect(setMnemonic).toHaveBeenCalledWith(mnemonic));
        expect(setTab).toHaveBeenCalledWith(ImportWalletScreens.SET_WALLET_PIN);
    });
});
