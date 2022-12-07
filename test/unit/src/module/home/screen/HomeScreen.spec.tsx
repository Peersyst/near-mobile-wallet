import { render, translate, screen } from "test-utils";
import HomeScreen from "module/home/screen/HomeScreen";
import { UseServiceInstanceMock, UseWalletStateMock } from "test-mocks";

describe("HomeScreen tests", () => {
    new UseServiceInstanceMock();
    new UseWalletStateMock();

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly when a wallet is selected", () => {
        new UseWalletStateMock();
        render(<HomeScreen />);
        expect(screen.getByText(translate("transactions"))).toBeDefined();
    });

    test("Renders correctly when a wallet is not selected", () => {
        render(<HomeScreen />);
        //Walletcard
        expect(screen.getByText(translate("create_your_account"))).toBeDefined();
        //Add wallet
        expect(screen.getByText(translate("add_a_wallet_txt")));
    });
});
