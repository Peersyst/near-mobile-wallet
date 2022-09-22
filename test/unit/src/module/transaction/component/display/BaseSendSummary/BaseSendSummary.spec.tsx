import BaseSendSummary from "module/transaction/component/display/BaseSendSummary/BaseSendSummary";
import { Typography } from "@peersyst/react-native-components";
import { render, translate } from "test-utils";

describe("Test for the BaseSendSummary", () => {
    test("Renders correctly", () => {
        const screen = render(
            <BaseSendSummary amount={1000} fee={"10"}>
                <Typography variant="body1">Children</Typography>
            </BaseSendSummary>,
        );
        expect(screen.getByText("1,000")).toBeDefined();
        expect(screen.getByText(translate("transaction_fee_label") + ":")).toBeDefined();
        expect(screen.getByText("10")).toBeDefined();
        expect(screen.getByText("Children")).toBeDefined();
    });
});
