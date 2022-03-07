import { render } from "test-utils";
import MnemonicList from "module/wallet/component/display/MnemonicList/MnemonicList";
import { fireEvent } from "@testing-library/react-native";

const mnemonic = ["pizza", "watermelon", "lemon"];

describe("MnemonicList tests", () => {
    test("Renders correctly", () => {
        const screen = render(<MnemonicList mnemonic={mnemonic} />);

        screen.getByText(mnemonic[0]);
        screen.getByText(mnemonic[1]);
        screen.getByText(mnemonic[2]);
    });

    test("onPress is called correctly", () => {
        const onPress = jest.fn();
        const screen = render(<MnemonicList mnemonic={mnemonic} onPress={onPress} />);

        const pizza = screen.getByText(mnemonic[0]);
        fireEvent.press(pizza);
        expect(onPress).toHaveBeenCalledWith(mnemonic[0]);
    });
});
