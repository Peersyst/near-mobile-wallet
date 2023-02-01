import { config } from "config";
import Typography from "module/common/component/display/Typography/Typography";
import { StakeStateMock, UseGetBalanceMock, UseNativeTokenConversionMock, UseServiceInstanceMock, UseWalletStateMock } from "test-mocks";
import { fireEvent, render, screen, translate, waitFor } from "test-utils";
import * as Recoil from "recoil";
import StakingSetAmountScreen from "module/staking/screen/SetAmountScreen/StakingSetAmountScreen";
import { ACTION_LABEL } from "module/wallet/component/display/Balance/constants/actionLabels";
import { CURRENCY_UNIT } from "module/wallet/component/display/Balance/constants/currencies";

describe("Test for StakingSetAmountScreen component", () => {
    test("Renders correctly", () => {
        new UseServiceInstanceMock();
        new UseWalletStateMock();
        new UseNativeTokenConversionMock({ value: "3000" });
        render(
            <StakingSetAmountScreen label="Enter the amount" maxAmount="1000">
                <Typography variant="body2Strong">Children</Typography>
            </StakingSetAmountScreen>,
        );
        expect(screen.getByText("Enter the amount")).toBeDefined();
        expect(screen.getByText("Children")).toBeDefined();
        expect(
            screen.getByText(
                translate("available_balance", {
                    amount: "1,000.00 " + config.tokenName,
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
            <StakingSetAmountScreen onSubmit={mockedOnSubmit} label="Enter the amount" maxAmount="1000">
                <Typography variant="body2Strong">Children</Typography>
            </StakingSetAmountScreen>,
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
