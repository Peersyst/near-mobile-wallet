import { FeeRate } from "ckb-peersyst-sdk";
import { formatAddress } from "@peersyst/react-utils";
import { translate } from "locale";
import { CKBSDKService } from "module/common/service/CkbSdkService";
import SendSummary from "module/transaction/screen/SendConfirmationScreen/SendSummary";
import { convertCKBToShannons } from "module/wallet/utils/convertCKBToShannons";
import { render } from "test-utils";

describe("Test for the SendSummary component", () => {
    test("Renders correctly", () => {
        jest.spyOn(CKBSDKService.prototype, "getAddress").mockReturnValue("0xMockedAddress");
        const screen = render(
            <SendSummary
                senderAddress="0xMockedAddress"
                amount={convertCKBToShannons(2400)}
                fee={FeeRate.NORMAL}
                receiverAddress={"0xRx"}
                message={"hola"}
                senderName={"Antonia"}
            />,
        );
        //Base summary
        expect(screen.getByText("2,400")).toBeDefined();
        expect(screen.getByText(translate("transaction_fee_label") + ":")).toBeDefined();
        expect(screen.getByText("0")).toBeDefined();
        expect(screen.getByText("001")).toBeDefined();
        //From
        expect(screen.getByText(translate("from") + ":"));
        expect("Antonia" + " - " + formatAddress("0xMockedAddress", "middle", 3)).toBeDefined();
        //Message
        expect(screen.getByText(translate("message") + ":")).toBeDefined();
        expect(screen.getByText("hola")).toBeDefined();
    });
});
