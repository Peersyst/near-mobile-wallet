import { render, translate, screen } from "test-utils";
import HomeScreen from "module/home/screen/HomeScreen";
import { UseServiceInstanceMock, UseWalletStateMock, WalletStateMock } from "test-mocks";
import { act } from "@testing-library/react-hooks";

describe("HomeScreen tests", () => {
    test("Renders correctly when a wallet is selected", () => {
        new UseServiceInstanceMock();
        new UseWalletStateMock();
        const screen = render(<HomeScreen />);
        expect(screen.getByText(translate("transactions"))).toBeDefined();
    });

    test("Renders correctly create acc", () => {
        new UseServiceInstanceMock();
        const state = new WalletStateMock({ selectedWallet: 21 });
        new UseWalletStateMock({ state });
        render(<HomeScreen />);
        expect(screen.getByText(translate("create_a_wallet"))).toBeDefined();
    });
});
