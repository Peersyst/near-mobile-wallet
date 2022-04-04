import { formatAddress } from "@peersyst/react-utils";
import { translate } from "locale";
import { CkbServiceMock } from "module/common/service/mock/CkbServiceMock";
import SendSummary from "module/transaction/screen/SendConfirmationScreen/SendSummary";
import { render } from "test-utils";

describe("Test for the SendSummary component", () => {
    test("Renders correctly", () => {
        jest.spyOn(CkbServiceMock.prototype, "getAddress").mockReturnValue("0xMockedAddress");
        const screen = render(
            <SendSummary
                serviceInstance={new CkbServiceMock([])}
                balance={"2400"}
                fee={"2"}
                receiverAddress={"0xRx"}
                message={"hola"}
                senderName={"Antonia"}
            />,
        );
        //Base summary
        expect(screen.getByText("2,400")).toBeDefined();
        expect(screen.getByText(translate("transaction_fee_label") + ":")).toBeDefined();
        expect(screen.getByText("2")).toBeDefined();
        //From
        expect(screen.getByText(translate("from") + ":"));
        expect("Antonia" + " - " + formatAddress("0xMockedAddress", "middle", 3)).toBeDefined();
        //Message 
        expect(screen.getByText(translate("message") + ":")).toBeDefined();
        expect(screen.getByText("hola")).toBeDefined();
    });
});
