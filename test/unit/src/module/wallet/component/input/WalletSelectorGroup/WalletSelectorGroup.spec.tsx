import { config } from "config";
import WalletSelectorGroup from "module/wallet/component/input/WalletSelectorGroup/WalletSelectorGroup";
import { AccountBalanceMock, UseServiceInstanceMock, UseWalletStateMock, WalletMock, WalletStateMock } from "test-mocks";
import { fireEvent, render, translate, waitFor } from "test-utils";

describe("WalletSelectorGroup", () => {
    test("renders correctly", async () => {
        const {
            state: { wallets },
        } = new UseWalletStateMock();
        const { serviceInstance } = new UseServiceInstanceMock();
        const accountBalance = new AccountBalanceMock({ available: "5" });
        jest.spyOn(serviceInstance, "getAccountBalance").mockResolvedValue(accountBalance);
        const screen = render(<WalletSelectorGroup />);
        expect(screen.getByText("Select funding account")).toBeDefined();
        await waitFor(() => expect(screen.getAllByText("5 " + config.tokenName)).toHaveLength(wallets.length));
        await waitFor(() => expect(screen.getByText(wallets[0].account)).toBeDefined());
        expect(screen.getByText(wallets[1].account)).toBeDefined();
    });

    test("Selects an account without enough balance", async () => {
        const {
            state: { wallets },
        } = new UseWalletStateMock();
        const { serviceInstance } = new UseServiceInstanceMock();
        const notEnoughtBalance = new AccountBalanceMock({ available: "0.09" });
        jest.spyOn(serviceInstance, "getAccountBalance").mockResolvedValue(notEnoughtBalance);
        const screen = render(<WalletSelectorGroup />);
        expect(screen.getByText("Select funding account")).toBeDefined();
        await waitFor(() => expect(screen.getAllByText("0.09 " + config.tokenName)).toHaveLength(wallets.length));
        await waitFor(() => expect(screen.getByText(wallets[0].account)).toBeDefined());
        expect(screen.getByText(wallets[1].account)).toBeDefined();
        await waitFor(() => expect(screen.getByTestId("RadioCheckedIcon")).toBeDefined());
        //By default do not display error
        expect(
            screen.queryByText(translate("invalid_seleccted_account", { amountInNEAR: config.minBalanceToCreateAccount, ns: "error" })),
        ).toBeNull();
        fireEvent.press(screen.getByTestId("RadioUncheckedIcon"));
        //Display error
        expect(
            screen.getByText(translate("invalid_seleccted_account", { amountInNEAR: config.minBalanceToCreateAccount, ns: "error" })),
        ).toBeDefined();
    });
});
