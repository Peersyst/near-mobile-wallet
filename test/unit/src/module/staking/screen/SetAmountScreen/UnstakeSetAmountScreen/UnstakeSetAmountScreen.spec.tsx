import { UseGetBalanceMock, UseNativeTokenConversionMock, UseServiceInstanceMock, UseWalletStateMock } from "mocks/common";
import { AccountBalanceMock } from "mocks/NearSdk";
import { fireEvent, render, screen, translate, waitFor } from "test-utils";
import { config } from "config";

import { UseSetTabMock } from "mocks/genesys";
import { UnstakeModalScreens } from "module/staking/component/core/UnstakeModal/UnstakeModal";
import UnstakeSetAmountScreen from "module/staking/screen/SetAmountScreen/UnstakeSetAmountScreen/UnstakeSetAmountScreen";
import { ACTION_LABEL } from "module/wallet/component/display/Balance/constants/actionLabels";
import { CURRENCY_UNIT } from "module/wallet/component/display/Balance/constants/currencies";

describe("Test for SetAmountStakeScreen component", () => {
    test("Renders correctly", async () => {
        new UseServiceInstanceMock();
        new UseWalletStateMock();
        new UseNativeTokenConversionMock({ value: "3000" });
        const balance = new AccountBalanceMock({ available: "1500.55" });
        new UseGetBalanceMock({ balance });

        render(<UnstakeSetAmountScreen />);

        expect(screen.getByText(translate("enter_amount_want_to", { action: "unstake" }))).toBeDefined();
        const available = await screen.findByText(
            translate("available_balance", {
                amount: ACTION_LABEL["round"] + " 1,500.55 " + config.tokenName,
                amount_price: ACTION_LABEL["round"] + " 3,000.00 " + CURRENCY_UNIT["usd"],
            }),
        );
        expect(available).toBeDefined();
    });

    test("Navigates to next screen", async () => {
        const { setTab } = new UseSetTabMock();
        new UseServiceInstanceMock();
        new UseWalletStateMock();
        new UseNativeTokenConversionMock({ value: "3000" });
        new UseGetBalanceMock();

        render(<UnstakeSetAmountScreen />);

        const input = screen.getByPlaceholderText(translate("enter_amount"));
        const btn = screen.getByText(translate("next"));
        await screen.findByText("Max");
        fireEvent.changeText(input, "100");
        fireEvent.press(btn);
        await waitFor(() => expect(setTab).toHaveBeenCalledWith(UnstakeModalScreens.CONFIRM_VALIDATOR));
    });
});
