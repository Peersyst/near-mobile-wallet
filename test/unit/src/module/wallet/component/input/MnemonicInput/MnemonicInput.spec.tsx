import { render } from "test-utils";
import MnemonicInput from "module/wallet/component/input/MnemonicInput/MnemonicInput";
import { translate } from "locale";
import { fireEvent } from "@testing-library/react-native";

describe("MnemonicInput tests", () => {
    test("Renders correctly", () => {
        const screen = render(<MnemonicInput />);

        expect(screen.getByText(translate("mnemonic"))).toBeDefined();
        expect(screen.getByText(translate("mnemonic_input_text"))).toBeDefined();
        expect(screen.getByPlaceholderText(translate("add_a_word"))).toBeDefined();
    });

    test("Adds and removes a word correctly", () => {
        const screen = render(<MnemonicInput />);

        const input = screen.getByPlaceholderText(translate("add_a_word"));
        fireEvent.changeText(input, "pizza");
        fireEvent(input, "submitEditing", { nativeEvent: { text: "pizza" } });
        expect(screen.getByPlaceholderText(translate("add_a_word"))).toBeDefined();

        fireEvent.changeText(input, "pineapple");
        fireEvent.changeText(input, " ");
        expect(screen.getByPlaceholderText(translate("add_a_word"))).toBeDefined();
        screen.getByText("pineapple");

        const pizza = screen.getByText("pizza");
        fireEvent.press(pizza);
        expect(screen.queryByText("pizza")).toBeNull();
    });
});
