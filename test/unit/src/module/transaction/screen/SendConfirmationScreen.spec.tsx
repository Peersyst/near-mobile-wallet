import { render, translate } from "test-utils";
import SendConfirmationScreen from "module/transaction/screen/SendConfirmationScreen/SendConfirmationScreen";
import * as Recoil from "recoil";
import { formatHash } from "@peersyst/react-utils";
import { config } from "config";
import { MOCKED_ADDRESS, UseServiceInstanceMock, UseWalletStateMock } from "test-mocks";

describe("SendConfirmationScreen tests", () => {
    new UseServiceInstanceMock();
    const { state } = new UseWalletStateMock();
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", () => {
        jest.spyOn(Recoil, "useRecoilValue").mockReturnValue({
            amount: 1000,
            fee: 10,
            senderWalletIndex: state.wallets[0].index,
            receiverAddress: "receiver_address",
            message: "Send message",
            token: "token",
        });

        const screen = render(<SendConfirmationScreen />);
        expect(screen.getByText(`1,000 ${config.tokenName}`)).toBeDefined();
        expect(screen.getByText(translate("transaction_fee_label") + ":")).toBeDefined();
        expect(screen.getByText(`10 ${config.tokenName}`)).toBeDefined();
        expect(screen.getByText(translate("total") + ":")).toBeDefined();
        expect(screen.getByText(`1,010 ${config.tokenName}`)).toBeDefined();

        expect(screen.getByText(translate("from"))).toBeDefined();
        expect(screen.getByText(state.wallets[0].name + " - " + formatHash(MOCKED_ADDRESS, "middle", 3))).toBeDefined();
        expect(screen.getByText(translate("to"))).toBeDefined();
        expect(screen.getByText("recei...ess")).toBeDefined();
        expect(screen.getByText(translate("message"))).toBeDefined();
        expect(screen.getByText("Send message")).toBeDefined();
    });
});
