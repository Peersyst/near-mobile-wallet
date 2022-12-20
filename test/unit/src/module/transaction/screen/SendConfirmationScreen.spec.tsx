import { render, translate } from "test-utils";
import SendConfirmationScreen from "module/transaction/screen/SendConfirmationScreen/SendConfirmationScreen";
import * as Recoil from "recoil";
import { config } from "config";
import { UseServiceInstanceMock, UseWalletStateMock } from "test-mocks";

describe("SendConfirmationScreen tests", () => {
    new UseServiceInstanceMock();
    const { state } = new UseWalletStateMock();
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", () => {
        jest.spyOn(Recoil, "useRecoilValue").mockReturnValue({
            amount: 1000,
            fee: config.estimatedFee,
            senderWalletIndex: 0,
            receiverAddress: "receiver_address",
            message: "Send message",
            token: "token",
        });

        const screen = render(<SendConfirmationScreen />);
        expect(screen.getByText(`1,000 ${config.tokenName}`)).toBeDefined();
        expect(screen.getByText(translate("transaction_fee_label") + " · ")).toBeDefined();
        expect(screen.getByText(`${config.estimatedFee} ${config.tokenName}`)).toBeDefined();
        expect(screen.getByText(translate("total") + ":")).toBeDefined();
        expect(screen.getByText("1,000.00005 " + config.tokenName)).toBeDefined();
        expect(screen.getByText(translate("from"))).toBeDefined();
        expect(screen.getByText(state.wallets[0].account)).toBeDefined();
        expect(screen.getByText(translate("to"))).toBeDefined();
        expect(screen.getByText("receiver_address")).toBeDefined();
        expect(screen.getByText(translate("message"))).toBeDefined();
        expect(screen.getByText("Send message")).toBeDefined();
    });
});
