import { render } from "test-utils";
import MnemonicPicker from "module/wallet/component/input/MnemonicPicker/MnemonicPicker";
import { fireEvent } from "@testing-library/react-native";

const mnemonic = ["pizza", "watermelon", "lemon"];

describe("MnemonicPicker tests", () => {
    test("Renders correctly", () => {
        const screen = render(<MnemonicPicker mnemonic={mnemonic} onSuccess={jest.fn()} />);

        screen.getByText(mnemonic[0]);
        screen.getByText(mnemonic[1]);
        screen.getByText(mnemonic[2]);
    });

    test("onSuccess is called correctly", () => {
        const handleSuccess = jest.fn();
        const screen = render(<MnemonicPicker mnemonic={mnemonic} onSuccess={handleSuccess} />);

        fireEvent.press(screen.getByText(mnemonic[0]));
        fireEvent.press(screen.getByText(mnemonic[1]));
        fireEvent.press(screen.getByText(mnemonic[2]));

        expect(handleSuccess).toHaveBeenCalled();
    });

    test("onError is called correctly", () => {
        const handleError = jest.fn();
        const screen = render(<MnemonicPicker mnemonic={mnemonic} onSuccess={jest.fn()} onError={handleError} />);

        fireEvent.press(screen.getByText(mnemonic[0]));
        fireEvent.press(screen.getByText(mnemonic[2]));
        fireEvent.press(screen.getByText(mnemonic[1]));

        expect(handleError).toHaveBeenCalled();
    });
});
