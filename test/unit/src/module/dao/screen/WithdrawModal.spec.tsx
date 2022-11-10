import WithdrawModal from "module/dao/component/core/WithdrawModal/WithdrawModal";
import { render, SuccessApiCall, translate } from "test-utils";
import { fireEvent, waitFor } from "@testing-library/react-native";
import { MockedUnlockableAmounts } from "mocks/DAO";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import { formatHash } from "@peersyst/react-utils";
import { config } from "config";
import { UseServiceInstanceMock, UseWalletStateMock } from "test-mocks";

describe("Withdraw modal test", () => {
    const { serviceInstance } = new UseServiceInstanceMock();
    const { state } = new UseWalletStateMock();

    beforeAll(() => {
        jest.spyOn(serviceInstancesMap, "get").mockReturnValue({ testnet: serviceInstance, mainnet: serviceInstance });
    });

    beforeEach(() => {
        jest.spyOn(serviceInstance, "getDAOUnlockableAmounts").mockReturnValue(SuccessApiCall(MockedUnlockableAmounts));
        jest.spyOn(serviceInstance, "getCKBBalance").mockReturnValue({
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
        await waitFor(() => expect(screen.getByText(translate("select_a_wallet") + ":")).toBeDefined());
        expect(screen.getAllByText(state.wallets[0].name)).toHaveLength(2);
        //Click on the second wallet
        fireEvent.press(screen.getByText(state.wallets[1].name));
        //Load new deposits
        await waitFor(() => expect(screen.getAllByText("500")).toHaveLength(4));
        //Click on the second deposit -> check in unlockable type withdraw and unlockable true
        const button = screen.getByText(translate("available"));
        fireEvent.press(button);
        //Moves to the following screen -> currentState: receiverIndex:1, depositIndex:1, feeRate: "10"
        fireEvent.press(screen.getByText(translate("unlock")));

        // 2 - Withdraw page with correct info
        await waitFor(() => expect(translate("destination_wallet") + ":").toBeDefined());
        expect(screen.getByText("secondWallet" + " - " + formatHash("0xMockedAddress", "middle", 3))).toBeDefined();
        expect(screen.getByText(`500 ${config.tokenName}`)).toBeDefined();
    });
});
