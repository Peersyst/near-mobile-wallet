import { render, SuccessApiCall } from "test-utils";
import { translate } from "locale";
import { waitFor } from "@testing-library/react-native";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import { mockedUseWallet } from "mocks/useWalletState";
import { MockedUnlockableAmounts } from "mocks/DAO";
import WithdrawConfirmationScreen from "module/dao/screen/WithdrawConfirmationScreen/WithdrawConfirmationScreen";
import { formatAddress } from "@peersyst/react-utils";
import { CKBSDKService } from "module/common/service/CkbSdkService";
import { FeeRate } from "ckb-peersyst-sdk";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import { MnemonicMocked } from "mocks/MnemonicMocked";

describe("SelectAccountAndDepositScreen tests", () => {
    const sdkInstance = new CKBSDKService("testnet", MnemonicMocked);

    beforeAll(() => {
        jest.spyOn(serviceInstancesMap, "get").mockReturnValue({ testnet: sdkInstance, mainnet: sdkInstance });
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(sdkInstance, "getDAOUnlockableAmounts").mockReturnValue(SuccessApiCall(MockedUnlockableAmounts));
        jest.spyOn(sdkInstance, "getAddress").mockReturnValue("0xMockedAddress");
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly with deposits", async () => {
        const screen = render(<WithdrawConfirmationScreen withdrawInfo={{ receiverIndex: 0, depositIndex: 0, feeRate: FeeRate.NORMAL }} />);
        await waitFor(() => expect(screen.getAllByText("500")).toHaveLength(2));
        expect(screen.getByText(translate("transaction_fee_label") + ":")).toBeDefined();
        expect(screen.getByText("001")).toBeDefined();
        //Withdraw summary
        expect(screen.getByText(translate("destination_wallet") + ":")).toBeDefined();
        expect(screen.getByText("firstWallet" + " - " + formatAddress("0xMockedAddress", "middle", 3))).toBeDefined();
        expect(screen.getByText(translate("deposit_apc") + ":")).toBeDefined();
        expect(screen.getByText("100%")).toBeDefined();
        expect(screen.getByText(translate("confirm"))).toBeDefined();
    });
});
