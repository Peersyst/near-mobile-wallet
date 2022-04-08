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

describe("SelectAccountAndDepositScreen tests", () => {
    beforeAll(() => {
        jest.spyOn(GetFee, "default").mockReturnValue(SuccessApiCall("10"));
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly without deposits", async () => {
        jest.spyOn(CkbServiceMock.prototype, "getDAOUnlockableAmounts").mockReturnValue(SuccessApiCall(MockedUnlockableAmounts));
        const screen = render(<WithdrawConfirmationScreen withdrawInfo={{ receiver: 0, deposit: 0, feeRate: "10" }} />);
        await waitFor(() => expect(screen.getByText(translate("send_confirmation_text"))));
    });
});
