import BaseSendSummary from "module/transaction/component/display/BaseSendSummary/BaseSendSummary";
import { Typography } from "@peersyst/react-native-components";
import { render, translate } from "test-utils";
import { config } from "config";

describe("Test for the BaseSendSummary", () => {
    test("Renders correctly with near", async () => {
        const screen = render(
            <BaseSendSummary amount={"1000"} fee={config.estimatedFee} showTotal>
                <Typography variant="body3Regular">Children</Typography>
            </BaseSendSummary>,
        );
        screen.debug();
        expect(screen.getByText("1,000 " + config.tokenName)).toBeDefined();
        expect(screen.getByText(translate + "transaction_fee_label" + " · ")).toBeDefined();
        //Fee
        expect(screen.getByText("0.0005" + " " + config.tokenName)).toBeDefined();
        //Total
        expect(screen.getByText(translate("total") + ":")).toBeDefined();
        expect(screen.getByText("1,000.00005 " + config.tokenName)).toBeDefined();
        //Children
        expect(screen.getByText("Children")).toBeDefined();
    });
    test("Renders correctly with ft", async () => {});
    test("Renders correctly with nft", async () => {});
});
