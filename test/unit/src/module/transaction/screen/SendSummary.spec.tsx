import SendSummary from "module/transaction/screen/SendConfirmationScreen/SendSummary";
import { render, translate } from "test-utils";
import { config } from "config";
import { UseServiceInstanceMock } from "test-mocks";

describe("Test for the SendSummary component", () => {
    test("Renders correctly", () => {
        new UseServiceInstanceMock();
        const screen = render(
            <SendSummary showTotal senderAccount="0xMockedAddress" amount={"2400"} fee={"0.001"} receiverAccount={"0xRx"} />,
        );
        //Base summary
        expect(screen.getByText(`2,400 ${config.tokenName}`)).toBeDefined();
        //Fee
        expect(screen.getByText(translate("transaction_fee_label") + " · ")).toBeDefined();
        expect(screen.getByText(`0.00100 ${config.tokenName}`)).toBeDefined();
        //Total
        expect(screen.getByText(translate("total") + " · ")).toBeDefined();
        expect(screen.getByText(`2,400.001 ${config.tokenName}`)).toBeDefined();
        //From
        expect(screen.getByText(translate("from")));
        expect(screen.getByText("0xMockedAddress")).toBeDefined();
    });
});
