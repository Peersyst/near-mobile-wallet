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

describe("SelectAccountAndDepositScreen tests", () => {
    beforeAll(() => {
        jest.spyOn(GetFee, "default").mockReturnValue(SuccessApiCall("10"));
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly without deposits", async () => {
        jest.spyOn(CkbServiceMock.prototype, "getDAOUnlockableAmounts").mockReturnValue(SuccessApiCall([]));
        const screen = render(<SelectAccountAndDepositScreen setWithdrawInfo={jest.fn()} />);
        await waitFor(() => expect(screen.getByText(translate("select_a_wallet") + ":")).toBeDefined());
        expect(screen.getAllByText(mockedUseWallet.state.wallets[0].name)).toHaveLength(2);
        expect(screen.getByText(translate("select_deposit") + ":")).toBeDefined();
        expect(screen.getByText(translate("no_deposits"))).toBeDefined();
        expect(screen.getByText(translate("next"))).toBeDefined();
    });

    test("Updates withdraw state and moves forward to the next screen", async () => {
        jest.spyOn(CkbServiceMock.prototype, "getDAOUnlockableAmounts").mockReturnValue(SuccessApiCall(MockedUnlockableAmounts));
        const setWithdrawInfo = jest.fn();
        const setTab = jest.fn();
        jest.spyOn(UseSetTab, "default").mockReturnValue(setTab);
        const screen = render(<SelectAccountAndDepositScreen setWithdrawInfo={setWithdrawInfo} />);
        await waitFor(() => expect(screen.getByText(translate("select_a_wallet") + ":")).toBeDefined());
        expect(screen.getAllByText("12,345")).toHaveLength(2);
        fireEvent.press(screen.getByText(translate("next")));
        //The deposit is zero because it corresponds to the 0 pos of the MockedUnlockableAmounts
        //The receiver is zero because is the first wallet
        await waitFor(() => expect(setWithdrawInfo).toHaveBeenCalledWith({ receiver: 0, deposit: 0, feeRate: "10" }));
        expect(setTab).toHaveBeenCalledWith(WithdrawScreens.SELECT_ACCOUNT);
    });
});
