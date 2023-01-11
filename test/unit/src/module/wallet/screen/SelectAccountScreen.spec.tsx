import { config } from "config";
import SelectAccountScreen from "module/wallet/screen/SelectAccountScreen";
import { UseWalletSelectorMock } from "test-mocks";
import { fireEvent, render, screen, translate, waitFor } from "test-utils";

describe("SelectAccountScreen", () => {
    test("Selects account and navigates", async () => {
        const { wallets } = new UseWalletSelectorMock();
        const handleSubmit = jest.fn();
        render(<SelectAccountScreen onSubmit={handleSubmit} submitText={"continue"} name={"Acc"} />);
        expect(screen.getByText(translate("select_funding_acc"))).toBeDefined();
        await waitFor(() => expect(screen.getAllByText("5 " + config.tokenName)).toHaveLength(wallets.length));
        await waitFor(() => expect(screen.getByText(wallets[0].account)).toBeDefined());
        expect(screen.getByText(wallets[1].account)).toBeDefined();
        expect(screen.getByText("continue")).toBeDefined();
        await waitFor(() => expect(screen.getByTestId("RadioCheckedIcon")).toBeDefined());
        const btn = screen.getAllByRole("button")[2];
        fireEvent.press(screen.getByTestId("RadioUncheckedIcon"));
        expect(btn).not.toBeDisabled();
        fireEvent.press(btn);
        await waitFor(() => expect(handleSubmit).toBeCalledTimes(1));
    });
});
