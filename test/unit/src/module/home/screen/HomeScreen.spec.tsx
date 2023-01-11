import { render, translate, screen } from "test-utils";
import HomeScreen from "module/home/screen/HomeScreen";
import { UseServiceInstanceMock, UseWalletStateMock, WalletStateMock } from "test-mocks";

describe("HomeScreen tests", () => {
    test("Renders correctly when a wallet is selected", () => {
        new UseServiceInstanceMock();
        new UseWalletStateMock();
        const screen = render(<HomeScreen />);
        expect(screen.getByText(translate("recent_activity"))).toBeDefined();
    });

    test("Renders correctly when a wallet is not selected", () => {
        new UseServiceInstanceMock();
        const state = new WalletStateMock({ selectedWallet: 21 });
        new UseWalletStateMock({ state });
        render(<HomeScreen />);
        //Walletcard
        expect(screen.getByText(translate("create_your_account"))).toBeDefined();
        //Add wallet
        expect(screen.getByText(translate("add_a_wallet_txt")));
    });
});
