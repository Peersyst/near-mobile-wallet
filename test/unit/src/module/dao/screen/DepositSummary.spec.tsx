import { formatAddress } from "@peersyst/react-utils";
import { translate } from "locale";
import DepositSummary from "module/dao/screen/DepositConfirmationScreen/DepositSummary";
import { render, SuccessApiCall, waitFor } from "test-utils";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import { mockedUseWallet } from "mocks/useWalletState";
import { MockedDAOBalance } from "mocks/DAO";
import { CkbServiceMock } from "module/common/service/mock/CkbServiceMock";

describe("Test for the DepositSummary", () => {
    test("Renders correctly", async () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(CkbServiceMock.prototype, "getDAOBalance").mockReturnValue(SuccessApiCall(MockedDAOBalance));
        jest.spyOn(CkbServiceMock.prototype, "getAddress").mockReturnValue("0xMockedAddress");
        const screen = render(<DepositSummary senderAddress={"0xMockedAddress"} amount={"1000"} fee={"10"} senderName={"Peersyst"} />);
        expect(screen.getByText("1,000")).toBeDefined();
        expect(screen.getByText(translate("transaction_fee_label") + ":")).toBeDefined();
        expect(screen.getByText("10")).toBeDefined();
        //Sender
        expect(screen.getByText(translate("from") + ":"));
        expect(screen.getByText("Peersyst" + " - " + formatAddress("0xMockedAddress", "middle", 3))).toBeDefined();
        //APC
        expect(screen.getByText(translate("estimated_apc") + ":"));
        await waitFor(() => expect(screen.getByText("2.4%")).toBeDefined());
        //Warning text
        expect(screen.getByText(translate("deposit_summary_warning")));
    });
});
