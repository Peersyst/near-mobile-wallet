import { render, translate } from "test-utils";
import SendConfirmationScreen from "module/transaction/screen/SendConfirmationScreen/SendConfirmationScreen";
import * as Recoil from "recoil";
import { config } from "config";
import { SendStateMock, UseServiceInstanceMock, UseWalletStateMock } from "test-mocks";

describe("SendConfirmationScreen tests", () => {
    new UseServiceInstanceMock();
    const { state } = new UseWalletStateMock();
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", () => {
        const sendState = new SendStateMock({ amount: "1000", senderWalletIndex: 0, receiverAddress: "receiverAddress" });
        jest.spyOn(Recoil, "useRecoilValue").mockReturnValue(sendState);

        const screen = render(<SendConfirmationScreen />);
        //Amount
        expect(screen.getByText(`1,000 ${config.tokenName}`)).toBeDefined();
        expect(screen.getByText(translate("transaction_fee_label") + " · ")).toBeDefined();
        //Fee
        expect(screen.getByText(`${config.estimatedFee} ${config.tokenName}`)).toBeDefined();
        //Total
        expect(screen.getByText(translate("total") + " · ")).toBeDefined();
        expect(screen.getByText("1,000.00005 " + config.tokenName)).toBeDefined();
        //From
        expect(screen.getByText(translate("from"))).toBeDefined();
        expect(screen.getByText(state.wallets[0].account)).toBeDefined();
        //To
        expect(screen.getByText(translate("to"))).toBeDefined();
        expect(screen.getByText("receiverAddress")).toBeDefined();
    });
});
