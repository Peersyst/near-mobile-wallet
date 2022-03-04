import { render } from "test-utils";
import WalletAdvisesScreen from "module/wallet/screen/WalletAdvisesScreen";
import { translate } from "locale";
import * as UseTabs from "module/common/component/base/navigation/Tabs/hook/useTabs";
import { act, fireEvent } from "@testing-library/react-native";

describe("WalletAdvisesScreen tests", () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", () => {
        jest.useFakeTimers();

        const setTab = jest.fn();
        jest.spyOn(UseTabs, "default").mockReturnValue([0, setTab]);

        const screen = render(<WalletAdvisesScreen />);

        expect(screen.getByText(translate("advise") + " 1")).toBeDefined();

        const generateMnemonicButton = screen.getByText(translate("generate_mnemonic"));
        fireEvent.press(generateMnemonicButton);
        expect(setTab).not.toHaveBeenCalled();

        act(() => jest.runAllTimers());
        fireEvent.press(screen.getByText(translate("next")));
        expect(screen.getByText(translate("advise") + " 2")).toBeDefined();

        act(() => jest.runAllTimers());
        fireEvent.press(screen.getByText(translate("next")));
        expect(screen.getByText(translate("advise") + " 3")).toBeDefined();
        fireEvent.press(generateMnemonicButton);
        expect(setTab).toHaveBeenCalled();

        jest.useRealTimers();
    });
});
