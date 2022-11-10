import { render, SuccessApiCall, translate } from "test-utils";
import { waitFor } from "@testing-library/react-native";

import { MockedUnlockableAmounts } from "mocks/DAO";
import WithdrawConfirmationScreen from "module/dao/screen/WithdrawConfirmationScreen/WithdrawConfirmationScreen";
import { formatHash } from "@peersyst/react-utils";
import { FeeRate } from "ckb-peersyst-sdk";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import { config } from "config";
import { UseServiceInstanceMock, UseWalletStateMock } from "test-mocks";

describe("SelectAccountAndDepositScreen tests", () => {
    const { serviceInstance } = new UseServiceInstanceMock();
    new UseWalletStateMock();

    beforeAll(() => {
        jest.spyOn(serviceInstancesMap, "get").mockReturnValue({ testnet: serviceInstance, mainnet: serviceInstance });
        jest.spyOn(serviceInstance, "getDAOUnlockableAmounts").mockReturnValue(SuccessApiCall(MockedUnlockableAmounts));
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly with deposits", async () => {
        const screen = render(<WithdrawConfirmationScreen withdrawInfo={{ receiverIndex: 0, depositIndex: 0, feeRate: FeeRate.NORMAL }} />);
        await waitFor(() => expect(screen.getAllByText(`500 ${config.tokenName}`)).toBeDefined());
        expect(screen.getByText(translate("transaction_fee_label") + ":")).toBeDefined();
        expect(screen.getByText(`0.001 ${config.tokenName}`)).toBeDefined();
        expect(screen.getByText(translate("total") + ":")).toBeDefined();
        expect(screen.getByText(`500.001 ${config.tokenName}`)).toBeDefined();
        //Withdraw summary
        expect(screen.getByText(translate("destination_wallet"))).toBeDefined();
        expect(screen.getByText("firstWallet" + " - " + formatHash("0xMockedAddress", "middle", 3))).toBeDefined();
        expect(screen.getByText(translate("deposit_apc"))).toBeDefined();
        expect(screen.getByText("100%")).toBeDefined();
        expect(screen.getByText(translate("confirm"))).toBeDefined();
    });
});
