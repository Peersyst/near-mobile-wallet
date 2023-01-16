import BaseSendSummary from "module/transaction/component/display/BaseSendSummary/BaseSendSummary";
import { Typography } from "@peersyst/react-native-components";
import { render, translate } from "test-utils";
import { config } from "config";

describe("Test for the BaseSendSummary", () => {
    test("Renders correctly", async () => {
        const screen = render(
            <BaseSendSummary amount={"1000"} fee={config.estimatedFee} token={"tokenName"} total>
                <Typography variant="body3Regular">Children</Typography>
            </BaseSendSummary>,
        );
        expect(screen.getByText("1,000 tokenName")).toBeDefined();
        expect(screen.getByText(translate("transaction_fee_label") + " · ")).toBeDefined();
        //Fee
        expect(screen.getByText(config.estimatedFee + " " + config.tokenName)).toBeDefined();
        //Total
        expect(screen.getByText(translate("total") + ":")).toBeDefined();
        expect(screen.getByText("1,000.00005 tokenName")).toBeDefined();
        //Children
        expect(screen.getByText("Children")).toBeDefined();
    });
});
