import { config } from "config";
import SelectFundingAccount from "module/wallet/screen/SelectFundingAccount/SelectFundingAccount";
import { AccountBalanceMock, UseCreateWalletMock, UseServiceInstanceMock, UseWalletStateMock } from "test-mocks";
import { render, waitFor, screen, fireEvent } from "test-utils";

describe("SelectFundingAccount", () => {
    test("Selects account and navigates", async () => {
        const { serviceInstance } = new UseServiceInstanceMock();
        const {
            state: { wallets },
        } = new UseWalletStateMock();
        const accountBalance = new AccountBalanceMock({ available: "5" });
        const { setFundAccount } = new UseCreateWalletMock();
        jest.spyOn(serviceInstance, "getAccountBalance").mockResolvedValue(accountBalance);
        const handleSubmit = jest.fn();
        render(<SelectFundingAccount onSubmit={handleSubmit} submitText={"continue"} />);
        expect(screen.getByText("Select funding account")).toBeDefined();
        await waitFor(() => expect(screen.getAllByText("5 " + config.tokenName)).toHaveLength(wallets.length));
        await waitFor(() => expect(screen.getByText(wallets[0].account)).toBeDefined());
        expect(screen.getByText(wallets[1].account)).toBeDefined();
        expect(screen.getByText("continue")).toBeDefined();
        await waitFor(() => expect(screen.getByTestId("RadioCheckedIcon")).toBeDefined());
        const btn = screen.getAllByRole("button")[2];
        fireEvent.press(screen.getByTestId("RadioUncheckedIcon"));
        expect(btn).not.toBeDisabled();
        fireEvent.press(btn);
        await waitFor(() => expect(setFundAccount).toBeCalledTimes(1));
    });
});
