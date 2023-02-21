import BaseSendSummary from "module/transaction/component/display/BaseSendSummary/BaseSendSummary";
import { Typography } from "@peersyst/react-native-components";
import { render, translate } from "test-utils";
import { config } from "config";
import { NftTokenMock, TokenMock } from "test-mocks";

describe("Test for the BaseSendSummary", () => {
    test("Renders correctly with near", async () => {
        const screen = render(
            <BaseSendSummary amount={"1000"} fee={config.estimatedFee} showTotal>
                <Typography variant="body3Regular">Children</Typography>
            </BaseSendSummary>,
        );

        //Amount
        expect(screen.getByText("1,000 " + config.tokenName)).toBeDefined();
        //Fee
        expect(screen.getByText(translate("transaction_fee_label") + " · ")).toBeDefined();
        expect(screen.getByText(config.estimatedFee + " " + config.tokenName)).toBeDefined();
        //Total
        expect(screen.getByText("1,000.00005" + " " + config.tokenName)).toBeDefined();
        //Children
        expect(screen.getByText("Children")).toBeDefined();
    });
    test("Renders correctly with ft", async () => {
        const token = new TokenMock();
        const screen = render(
            <BaseSendSummary token={token} amount={"1000"} fee={config.estimatedFee}>
                <Typography variant="body3Regular">Children</Typography>
            </BaseSendSummary>,
        );
        //Amount
        expect(screen.getByText("1,000 " + token.metadata.symbol)).toBeDefined();
        //Fee
        expect(screen.getByText(translate("transaction_fee_label") + " · ")).toBeDefined();
        expect(screen.getByText(config.estimatedFee + " " + config.tokenName)).toBeDefined();
        //Children
        expect(screen.getByText("Children")).toBeDefined();
    });
    test("Renders correctly with nft", async () => {
        const nft = new NftTokenMock();
        const screen = render(
            <BaseSendSummary amount="1" nft={nft}>
                <Typography variant="body3Regular">Children</Typography>
            </BaseSendSummary>,
        );
        //Nft name
        expect(screen.getByText(nft.metadata.title)).toBeDefined();
        //Fee
        expect(screen.getByText(translate("transaction_fee_label") + " · ")).toBeDefined();
        expect(screen.getByText(config.estimatedFee + " " + config.tokenName)).toBeDefined();
        //Children
        expect(screen.getByText("Children")).toBeDefined();
    });
});
