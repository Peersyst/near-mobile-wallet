import { render, translate } from "test-utils";
import EnterWalletMnemonicScreen from "module/wallet/screen/EnterWalletMnemonicScreen";
import { fireEvent, waitFor } from "@testing-library/react-native";
import { MnemonicMocked } from "mocks/MnemonicMocked";
import { UseCreateWalletMock } from "test-mocks";

describe("EnterWalletMnemonicScreen tests", () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Enters mnemonic correctly", async () => {
        const handleSubmit = jest.fn();
        const { setMnemonic } = new UseCreateWalletMock();
        const screen = render(<EnterWalletMnemonicScreen onSubmit={handleSubmit} submitText={translate("set_pin")} />);
        const input = screen.getByPlaceholderText(translate("add_a_word"));
        for (const word of MnemonicMocked.split(" ")) {
            fireEvent.changeText(input, word);
            fireEvent(input, "submitEditing", { nativeEvent: { text: word } });
        }
        const button = screen.getByText(translate("set_pin"));
        expect(button).toBeDefined();
        fireEvent.press(button);
        await waitFor(() => expect(setMnemonic).toBeCalled());
    });
});
