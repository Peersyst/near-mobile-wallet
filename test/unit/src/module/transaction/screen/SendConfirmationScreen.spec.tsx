import { render } from "test-utils";
import SendConfirmationScreen from "module/transaction/screen/SendConfirmationScreen/SendConfirmationScreen";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import * as Recoil from "recoil";
import { translate } from "locale";
import { formatAddress } from "@peersyst/react-utils";
import { mockedUseWallet } from "mocks/useWalletState";
import { CkbServiceMock } from "module/common/service/mock/CkbServiceMock";

describe("SendConfirmationScreen tests", () => {
    test("Renders correctly", () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(CkbServiceMock.prototype, "getAddress").mockReturnValue("0xMockedAddress");
        jest.spyOn(Recoil, "useRecoilValue").mockReturnValue({
            amount: "1000",
            fee: "10",
            senderWalletIndex: mockedUseWallet.state.wallets[0].index,
            receiverAddress: "receiver_address",
            message: "Send message",
        });

        const screen = render(<SendConfirmationScreen />);
        expect(screen.getByText("1,000")).toBeDefined();
        expect(screen.getByText(translate("transaction_fee_label") + ":")).toBeDefined();
        expect(screen.getByText("10")).toBeDefined();

        expect(screen.getByText(translate("from") + ":")).toBeDefined();
        expect(
            screen.getByText(mockedUseWallet.state.wallets[0].name + " - " + formatAddress("0xMockedAddress", "middle", 3)),
        ).toBeDefined();
        expect(screen.getByText(translate("to") + ":")).toBeDefined();
        expect(screen.getByText("recei...ess")).toBeDefined();
        expect(screen.getByText(translate("message") + ":")).toBeDefined();
        expect(screen.getByText("Send message")).toBeDefined();
    });
});
