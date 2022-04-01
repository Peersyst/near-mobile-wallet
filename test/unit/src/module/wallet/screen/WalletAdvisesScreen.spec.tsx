import { render } from "test-utils";
import WalletAdvisesScreen from "module/wallet/screen/WalletAdvisesScreen/WalletAdvisesScreen";
import { translate } from "locale";
import { act, fireEvent } from "@testing-library/react-native";

describe("WalletAdvisesScreen tests", () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", () => {
        jest.useFakeTimers();

        const handleNextScreen = jest.fn();

        const screen = render(<WalletAdvisesScreen onNextScreen={handleNextScreen} nextScreenText="Next Screen" />);

        expect(screen.getByText(translate("advise1_title"))).toBeDefined();

        let generateMnemonicButton = screen.getByText("Next Screen");
        fireEvent.press(generateMnemonicButton);
        expect(handleNextScreen).not.toHaveBeenCalled();

        act(() => jest.runAllTimers());
        fireEvent.press(screen.getByText(translate("next")));
        expect(screen.getByText(translate("advise2_title"))).toBeDefined();

        act(() => jest.runAllTimers());
        fireEvent.press(screen.getByText(translate("next")));
        expect(screen.getByText(translate("advise3_title"))).toBeDefined();

        act(() => jest.runAllTimers());
        generateMnemonicButton = screen.getByText("Next Screen");
        fireEvent.press(generateMnemonicButton);
        fireEvent.press(generateMnemonicButton);
        expect(handleNextScreen).toHaveBeenCalled();

        jest.useRealTimers();
    });
});
