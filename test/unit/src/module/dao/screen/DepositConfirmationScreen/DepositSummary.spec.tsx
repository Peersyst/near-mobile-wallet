import { formatAddress } from "@peersyst/react-utils";
import { translate } from "locale";
import DepositSummary from "module/dao/screen/DepositConfirmationScreen/DepositSummary";
import { render } from "test-utils";

describe("Test for the DepositSummary", () => {
    test("Renders correctly", () => {
        const mockedServiceInstance = {
            getAddress: jest.fn().mockReturnValue("0xMockedAddress"),
        };
        const screen = render(
            <DepositSummary serviceInstance={mockedServiceInstance as any} balance={"1000"} fee={"10"} senderName={"Peersyst"} />,
        );
        expect(screen.getByText("1,000")).toBeDefined();
        expect(screen.getByText(translate("transaction_fee_label") + ":")).toBeDefined();
        expect(screen.getByText("10")).toBeDefined();
        //TODO: mock tet
        expect(screen.getByText("Peersyst" + " - " + formatAddress("0xMockedAddress", "middle", 3))).toBeDefined();
        //TODO: spyON getDaoBalance
    });
});
