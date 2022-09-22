import { render, translate } from "test-utils";
import HomeScreen from "module/home/screen/HomeScreen";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import { mockedUseWallet } from "mocks/useWalletState";

describe("HomeScreen tests", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly when a wallet is selected", () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);

        const screen = render(<HomeScreen />);

        expect(screen.getByText(translate("transactions"))).toBeDefined();
    });

    test("Renders correctly when a wallet is not selected", () => {
        const screen = render(<HomeScreen />);

        expect(screen.getByText(translate("create_a_wallet"))).toBeDefined();
    });
});
