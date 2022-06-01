import { render } from "test-utils";
import EnterWalletMnemonicScreen from "module/wallet/screen/EnterWalletMnemonicScreen";
import { translate } from "locale";
import { fireEvent, waitFor } from "@testing-library/react-native";
import * as UseCreateWallet from "module/wallet/hook/useCreateWallet";
import { MnemonicMocked } from "mocks/MnemonicMocked";

describe("EnterWalletMnemonicScreen tests", () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Enters mnemonic correctly", async () => {
        const handleSubmit = jest.fn();
        const setMnemonic = jest.fn();
        jest.spyOn(UseCreateWallet, "default").mockReturnValue({
            state: { name: "Name", mnemonic: undefined, pin: undefined, colorIndex: undefined },
            setName: jest.fn(),
            setPin: jest.fn(),
            setMnemonic,
            setColorIndex: jest.fn(),
            reset: jest.fn(),
        });

        const screen = render(<EnterWalletMnemonicScreen onSubmit={handleSubmit} submitText={translate("set_pin")} />);

        const input = screen.getByPlaceholderText(translate("add_a_word"));
        for (const word of MnemonicMocked.split(" ")) {
            fireEvent.changeText(input, word);
            fireEvent(input, "submitEditing", { nativeEvent: { text: word } });
        }

        const button = screen.getByText(translate("set_pin"));
        fireEvent.press(button);
        await waitFor(() => expect(setMnemonic).toHaveBeenCalledWith(MnemonicMocked.split(" ")));
        expect(handleSubmit).toHaveBeenCalled();
    });
});
