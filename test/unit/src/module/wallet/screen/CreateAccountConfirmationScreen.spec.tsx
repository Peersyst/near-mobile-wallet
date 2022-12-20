import { config } from "config";
import CreateAccountConfirmationScreen from "module/wallet/screen/CreateAccountConfirmScreen/CreateAccountConfirmationScreen";
import { UseCreateWalletMock, UseWalletMock } from "test-mocks";
import { fireEvent, render, screen, translate, waitFor } from "test-utils";

describe("CreateAccountConfirmationScreen", () => {
    test("should render", async () => {
        const handleOnCancel = jest.fn();
        const handleOnSubmit = jest.fn();
        const handleCreateAccount = jest.fn().mockResolvedValue(true);
        new UseWalletMock({ account: "acc" });
        const { state } = new UseCreateWalletMock();
        render(<CreateAccountConfirmationScreen onCancel={handleOnCancel} onSubmit={handleCreateAccount} onSuccess={handleOnSubmit} />);
        //Send summary
        expect(screen.getByText(`0.1 ${config.tokenName}`)).toBeDefined();
        expect(screen.getByText(translate("transaction_fee_label") + " · ")).toBeDefined();
        expect(screen.getByText(config.estimatedFee + " " + config.tokenName)).toBeDefined();
        //From
        expect(screen.getByText(translate("from")));
        expect(screen.getByText("acc")).toBeDefined();
        //To
        expect(screen.getByText(translate("to")));
        expect(screen.getByText(state.name!)).toBeDefined();
        //Cancel button
        const btn = screen.getByText(translate("cancel"));
        expect(btn).toBeDefined();
        fireEvent.press(btn);
        expect(handleOnCancel).toHaveBeenCalled();
        //Continue button
        const btn2 = screen.getByText(translate("continue"));
        expect(btn2).toBeDefined();
        fireEvent.press(btn2);
        expect(handleCreateAccount).toHaveBeenCalled();

        await waitFor(() => {
            expect(handleOnSubmit).toHaveBeenCalled();
        });
    });
});
