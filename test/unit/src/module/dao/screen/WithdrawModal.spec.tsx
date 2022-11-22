import WithdrawModal from "module/dao/component/core/WithdrawModal/WithdrawModal";
import { render, SuccessApiCall, translate } from "test-utils";
import { fireEvent, waitFor } from "@testing-library/react-native";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import { mockedUseWallet } from "mocks/useWalletState";
import { MockedUnlockableAmounts } from "mocks/DAO";
import { CKBSDKService } from "module/common/service/CkbSdkService";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import { MnemonicMocked } from "mocks/MnemonicMocked";
import { formatHash } from "@peersyst/react-utils";
import { config } from "config";

describe("Withdraw modal test", () => {
    const sdkInstance = new CKBSDKService("testnet", MnemonicMocked);

    beforeAll(() => {
        jest.spyOn(serviceInstancesMap, "get").mockReturnValue({ testnet: sdkInstance, mainnet: sdkInstance });
    });

    beforeEach(() => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(sdkInstance, "getDAOUnlockableAmounts").mockReturnValue(SuccessApiCall(MockedUnlockableAmounts));
        jest.spyOn(sdkInstance, "getAddress").mockReturnValue("0xMockedAddress");
        jest.spyOn(sdkInstance, "getCKBBalance").mockReturnValue({
            totalBalance: 20000,
            occupiedBalance: 9600,
            freeBalance: 10400,
        });
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", () => {
        const screen = render(<WithdrawModal />);
        expect(screen.getByText(translate("withdraw"))).toBeDefined();
    });
    test("Withdraw is completed successfully", async () => {
        const screen = render(<WithdrawModal />);
        // 1 - Select second account and second deposit
        // Waits untill the first screen is load -> currentState: receiverIndex:0, depositIndex:0, feeRate: "10"
        expect(await screen.findByText(translate("select_a_wallet") + ":"));
        const wallet = screen.getByText(mockedUseWallet.state.wallets[0].name);
        expect(wallet).toBeDefined();
        //Open the modal
        fireEvent.press(wallet);
        //Select the second account
        const secondAccount = await screen.findByText(mockedUseWallet.state.wallets[1].name);
        fireEvent.press(secondAccount);

        //Load new deposits
        const defaultDeposit = await screen.findByText("500");
        expect(defaultDeposit).toBeDefined();
        //Open the modal
        fireEvent.press(defaultDeposit);
        //Click on the second deposit -> check in unlockable type withdraw and unlockable true
        const button = screen.getByText(translate("available"));
        fireEvent.press(button);
        //Moves to the following screen -> currentState: receiverIndex:1, depositIndex:1, feeRate: "10"
        fireEvent.press(screen.getByText(translate("unlock")));

        // 2 - Withdraw page with correct info
        await waitFor(() => expect(translate("destination_wallet") + ":").toBeDefined());

        await waitFor(() => expect(screen.getByText(`500 ${config.tokenName}`)).toBeDefined());
        expect(screen.getByText("secondWallet" + " - " + formatHash("0xMockedAddress", "middle", 3))).toBeDefined();
    });
});
