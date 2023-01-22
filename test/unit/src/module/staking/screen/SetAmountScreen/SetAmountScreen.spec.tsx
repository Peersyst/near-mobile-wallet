import { config } from "config";
import Typography from "module/common/component/display/Typography/Typography";
import { ACTION_LABEL } from "module/wallet/component/display/Balance/utils/actionLabels";
import { CURRENCY_UNIT } from "module/wallet/component/display/Balance/utils/currencies";
import { StakeStateMock, UseGetBalanceMock, UseNativeTokenConversionMock, UseServiceInstanceMock, UseWalletStateMock } from "test-mocks";
import { fireEvent, render, screen, translate, waitFor } from "test-utils";
import * as Recoil from "recoil";
import SetAmountScreen from "module/staking/screen/SetAmountScreen/SetAmountScreen";

describe("Test for BaseSetAmountStakeScreen component", () => {
    test("Renders correctly", () => {
        new UseServiceInstanceMock();
        new UseWalletStateMock();
        new UseNativeTokenConversionMock({ value: "3000" });
        render(
            <SetAmountScreen label="Enter the amount" maxAmount="1000">
                <Typography variant="body2Strong">Children</Typography>
            </SetAmountScreen>,
        );
        expect(screen.getByText("Enter the amount")).toBeDefined();
        expect(screen.getByText("Children")).toBeDefined();
        expect(
            screen.getByText(
                translate("available_balance", {
                    amount: "1,000 " + config.tokenName,
                    amount_price: ACTION_LABEL["round"] + " 3,000 " + CURRENCY_UNIT["usd"],
                }),
            ),
        ).toBeDefined();
    });

    test("Sets amount and press submit", async () => {
        new UseServiceInstanceMock();
        new UseWalletStateMock();
        new UseNativeTokenConversionMock({ value: "3000" });
        new UseGetBalanceMock();
        const mockedOnSubmit = jest.fn();
        const mockedSetStakeState = jest.fn();
        jest.spyOn(Recoil, "useRecoilState").mockReturnValue([new StakeStateMock(), mockedSetStakeState]);
        render(
            <SetAmountScreen onSubmit={mockedOnSubmit} label="Enter the amount" maxAmount="1000">
                <Typography variant="body2Strong">Children</Typography>
            </SetAmountScreen>,
        );
        const input = screen.getByPlaceholderText(translate("enter_amount"));
        const btn = screen.getByText(translate("next"));
        await screen.findByText("Max");
        expect(btn).toBeDefined();
        expect(input).toBeDefined();
        fireEvent.changeText(input, "10000");
        fireEvent.press(btn);
        expect(mockedOnSubmit).not.toHaveBeenCalled();
        fireEvent.changeText(input, "100");
        fireEvent.press(btn);
        await waitFor(() => expect(mockedOnSubmit).toHaveBeenCalled());
        expect(mockedSetStakeState).toHaveBeenCalled();
    });
});
