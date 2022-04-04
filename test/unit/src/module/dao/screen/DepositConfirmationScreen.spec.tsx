import { render } from "test-utils";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import * as Recoil from "recoil";
import { translate } from "locale";
import { formatAddress } from "@peersyst/react-utils";
import { mockedUseWallet } from "mocks/useWalletState";
import { CkbServiceMock } from "module/common/service/mock/CkbServiceMock";
import DepositConfirmationScreen from "module/dao/screen/DepositConfirmationScreen/DepositConfirmationScreen";

describe("DepositConfirmationScreen tests", () => {
    test("Renders correctly", () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(CkbServiceMock.prototype, "getAddress").mockReturnValue("0xMockedAddress");
        jest.spyOn(Recoil, "useRecoilValue").mockReturnValue({
            amount: "1000",
            fee: "10",
            senderWalletIndex: mockedUseWallet.state.wallets[0].index,
        });

        const screen = render(<DepositConfirmationScreen />);
        expect(screen.getByText("1,000")).toBeDefined();
        expect(screen.getByText(translate("transaction_fee_label") + ":")).toBeDefined();
        expect(screen.getByText("10")).toBeDefined();

        expect(screen.getByText(translate("from") + ":")).toBeDefined();
        expect(
            screen.getByText(mockedUseWallet.state.wallets[0].name + " - " + formatAddress("0xMockedAddress", "middle", 3)),
        ).toBeDefined();
    });
});
