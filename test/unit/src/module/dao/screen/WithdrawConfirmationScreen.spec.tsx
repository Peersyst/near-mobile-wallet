import { render, SuccessApiCall } from "test-utils";
import { translate } from "locale";
import { fireEvent, waitFor } from "@testing-library/react-native";
import SelectAccountAndDepositScreen from "module/dao/screen/SelectAccountAndDepositScreen/SelectAccountAndDepositScreen";
import * as UseSetTab from "module/common/component/base/navigation/Tabs/hook/useSetTab";
import { CkbServiceMock } from "module/common/service/mock/CkbServiceMock";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import { mockedUseWallet } from "mocks/useWalletState";
import * as GetFee from "module/transaction/mock/getFee";
import { WithdrawScreens } from "module/dao/component/core/WithdrawModal/WithdrawModal";
import { MockedUnlockableAmounts } from "mocks/DAO";
import WithdrawConfirmationScreen from "module/dao/screen/WithdrawConfirmationScreen/WithdrawConfirmationScreen";
import { formatAddress } from "@peersyst/react-utils";

describe("SelectAccountAndDepositScreen tests", () => {
    beforeAll(() => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(CkbServiceMock.prototype, "getDAOUnlockableAmounts").mockReturnValue(SuccessApiCall(MockedUnlockableAmounts));
        jest.spyOn(CkbServiceMock.prototype, "getAddress").mockReturnValue("0xMockedAddress");
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly without deposits", async () => {
        const screen = render(<WithdrawConfirmationScreen withdrawInfo={{ receiver: 0, deposit: 0, feeRate: "10" }} />);
        await waitFor(() => expect(screen.getByText("500")).toBeDefined());
        screen.debug();
        expect(screen.getByText(translate("transaction_fee_label") + ":")).toBeDefined();
        expect(screen.getByText("10")).toBeDefined();
        //Withdraw summary
        expect(screen.getByText(translate("destination_wallet") + ":")).toBeDefined();
        expect(screen.getByText("firstWallet" + " - " + formatAddress("0xMockedAddress", "middle", 3))).toBeDefined();
        expect(screen.getByText(translate("deposit_apc") + ":")).toBeDefined();
        expect(screen.getByText("100%")).toBeDefined();
        expect(screen.getByText(translate("confirm"))).toBeDefined();
    });
});
