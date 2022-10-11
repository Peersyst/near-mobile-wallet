import { formatHash } from "@peersyst/react-utils";
import { CKBSDKService } from "module/common/service/CkbSdkService";
import SendSummary from "module/transaction/screen/SendConfirmationScreen/SendSummary";
import { render, translate } from "test-utils";
import { config } from "config";

describe("Test for the SendSummary component", () => {
    test("Renders correctly", () => {
        jest.spyOn(CKBSDKService.prototype, "getAddress").mockReturnValue("0xMockedAddress");
        const screen = render(
            <SendSummary
                senderAddress="0xMockedAddress"
                amount={2400}
                fee={"0.001"}
                receiverAddress={"0xRx"}
                message={"hola"}
                senderName={"Antonia"}
                token="token"
            />,
        );
        //Base summary
        expect(screen.getByText(`2,400 ${config.tokenName}`)).toBeDefined();
        expect(screen.getByText(translate("transaction_fee_label") + ":")).toBeDefined();
        expect(screen.getByText(`0.001 ${config.tokenName}`)).toBeDefined();
        expect(screen.getByText(translate("total") + ":")).toBeDefined();
        expect(screen.getByText(`2,400.001 ${config.tokenName}`)).toBeDefined();
        //From
        expect(screen.getByText(translate("from")));
        expect("Antonia" + " - " + formatHash("0xMockedAddress", "middle", 3)).toBeDefined();
        //Message
        expect(screen.getByText(translate("message"))).toBeDefined();
        expect(screen.getByText("hola")).toBeDefined();
    });
});
