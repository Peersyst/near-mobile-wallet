import { render, translate } from "test-utils";
import * as Recoil from "recoil";
import { formatHash } from "@peersyst/react-utils";
import DepositConfirmationScreen from "module/dao/screen/DepositConfirmationScreen/DepositConfirmationScreen";
import { config } from "config";
import { MOCKED_ADDRESS, UseServiceInstanceMock, UseWalletStateMock } from "test-mocks";

describe("DepositConfirmationScreen tests", () => {
    test("Renders correctly", () => {
        new UseServiceInstanceMock();
        const mockedWallet = new UseWalletStateMock().state.wallets[0];

        jest.spyOn(Recoil, "useRecoilValue").mockReturnValue({
            amount: "1000",
            fee: "0.001",
            senderWalletIndex: mockedWallet.index,
        });

        const screen = render(<DepositConfirmationScreen />);
        expect(screen.getByText(`1,000 ${config.tokenName}`)).toBeDefined();
        expect(screen.getByText(translate("transaction_fee_label") + ":")).toBeDefined();
        expect(screen.getByText(`0.001 ${config.tokenName}`)).toBeDefined();
        expect(screen.getByText(translate("total") + ":")).toBeDefined();
        expect(screen.getByText(`1,000.001 ${config.tokenName}`)).toBeDefined();
        expect(screen.getByText(translate("from"))).toBeDefined();
        expect(screen.getByText(mockedWallet.name + " - " + formatHash(MOCKED_ADDRESS, "middle", 3))).toBeDefined();
    });
});
