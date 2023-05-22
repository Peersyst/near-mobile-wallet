import { config } from "config";
import NEARAmountWithMaxTextField from "module/transaction/component/input/NEARAmountWithMaxTextField/NEARAmountWithMaxTextField";
import { ACTION_LABEL } from "module/wallet/component/display/Balance/constants/actionLabels";
import { CURRENCY_UNIT } from "module/wallet/component/display/Balance/constants/currencies";
import { AccountBalanceMock, UseGetBalanceMock, UseNativeTokenConversionMock } from "test-mocks";
import { render, screen, translate } from "test-utils";

describe("NEARAmountWithMaxTextField Test", () => {
    test("Renders and validates correctly", async () => {
        const balance = new AccountBalanceMock({ available: "1" });
        new UseGetBalanceMock({ balance });
        new UseNativeTokenConversionMock({ value: "100" });
        render(<NEARAmountWithMaxTextField index={0} placeholder="Enter amount" value="8" />);
        //Spinner until the balance is loaded
        expect(screen.getByTestId("ActivityIndicator")).toBeDefined();

        const available = await screen.findByText(
            translate("available_balance", {
                amount: ACTION_LABEL["round"] + " 0.995 " + config.tokenName,
                amount_price: ACTION_LABEL["round"] + " 100 " + CURRENCY_UNIT["usd"],
            }),
        );

        expect(available).toBeDefined();
    });
});
