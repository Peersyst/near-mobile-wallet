import { render, SuccessApiCall } from "test-utils";
import { translate } from "locale";
import { fireEvent, waitFor } from "@testing-library/react-native";
import SelectAccountAndDepositScreen from "module/dao/screen/SelectAccountAndDepositScreen/SelectAccountAndDepositScreen";
import * as UseSetTab from "module/common/component/base/navigation/Tabs/hook/useSetTab";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import { mockedUseWallet } from "mocks/useWalletState";
import { WithdrawScreens } from "module/dao/component/core/WithdrawModal/WithdrawModal";
import { MockedUnlockableAmounts } from "mocks/DAO";
import { CKBSDKService } from "module/common/service/CkbSdkService";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import { FeeRate } from "@peersyst/ckb-peersyst-sdk";
import { MnemonicMocked } from "mocks/MnemonicMocked";
import * as UseSelectedWallet from "module/wallet/hook/useSelectedWallet";
import { wallet } from "mocks/wallet";

describe("SelectAccountAndDepositScreen tests", () => {
    const sdkInstance = new CKBSDKService(MnemonicMocked);

    beforeAll(() => {
        jest.spyOn(UseSelectedWallet, "default").mockReturnValue(wallet);
        jest.spyOn(serviceInstancesMap, "get").mockReturnValue(sdkInstance);
        /*  jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(CkbServiceMock.prototype, "getCKBBalance").mockReturnValue(
            SuccessApiCall({ totalBalance: BigInt(20000), occupiedBalance: BigInt(9600), freeBalance: BigInt(125) }),
        ); */
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly without deposits", async () => {
        jest.spyOn(sdkInstance, "getDAOUnlockableAmounts").mockReturnValue(SuccessApiCall([]));
        const screen = render(<SelectAccountAndDepositScreen setWithdrawInfo={jest.fn()} />);
        screen.debug();
        await waitFor(() => expect(screen.getByText(translate("select_a_wallet") + ":")).toBeDefined());
        expect(screen.getAllByText(mockedUseWallet.state.wallets[0].name)).toHaveLength(2);
        expect(screen.getByText(translate("select_deposit") + ":")).toBeDefined();
        expect(screen.getByText(translate("no_deposits"))).toBeDefined();
        expect(screen.getByText(translate("next"))).toBeDefined();
    });

    test("Updates withdraw state and moves forward to the next screen", async () => {
        jest.spyOn(sdkInstance, "getDAOUnlockableAmounts").mockReturnValue(SuccessApiCall(MockedUnlockableAmounts));
        const setWithdrawInfo = jest.fn();
        const setTab = jest.fn();
        jest.spyOn(UseSetTab, "default").mockReturnValue(setTab);
        const screen = render(<SelectAccountAndDepositScreen setWithdrawInfo={setWithdrawInfo} />);
        await waitFor(() => expect(screen.getByText(translate("select_a_wallet") + ":")).toBeDefined());
        expect(screen.getAllByText("500")).toHaveLength(2);
        fireEvent.press(screen.getByText(translate("next")));
        //The deposit is zero because it corresponds to the 0 pos of the MockedUnlockableAmounts
        //The receiver is zero because is the first wallet
        await waitFor(() => expect(setWithdrawInfo).toHaveBeenCalledWith({ receiverIndex: 0, depositIndex: 0, feeRate: FeeRate.NORMAL }));
        expect(setTab).toHaveBeenCalledWith(WithdrawScreens.CONFIRMATION);
    });
});
