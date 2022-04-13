import WithdrawModal from "module/dao/component/core/WithdrawModal/WithdrawModal";
import { render, SuccessApiCall } from "test-utils";
import { translate } from "locale";
import { fireEvent, waitFor } from "@testing-library/react-native";
import { CkbServiceMock } from "module/common/service/mock/CkbServiceMock";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import { mockedUseWallet } from "mocks/useWalletState";
import * as GetFee from "module/transaction/mock/getFee";
import { MockedUnlockableAmounts } from "mocks/DAO";
import { formatAddress } from "@peersyst/react-utils";

describe("Withdraw modal test", () => {
    beforeEach(() => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(CkbServiceMock.prototype, "getDAOUnlockableAmounts").mockReturnValue(SuccessApiCall(MockedUnlockableAmounts));
        jest.spyOn(CkbServiceMock.prototype, "getAddress").mockReturnValue("0xMockedAddress");
        jest.spyOn(CkbServiceMock.prototype, "getCKBBalance").mockReturnValue(
            SuccessApiCall({ totalBalance: BigInt(20000), occupiedBalance: BigInt(9600), freeBalance: BigInt(125) }),
        );
        jest.spyOn(GetFee, "default").mockReturnValue(SuccessApiCall("10"));
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
        expect(screen.getAllByText(mockedUseWallet.state.wallets[0].name)).toHaveLength(2);
        //Click on the second wallet
        fireEvent.press(screen.getByText(mockedUseWallet.state.wallets[1].name));
        //Load new deposits
        await waitFor(() => expect(screen.getAllByText("500")).toHaveLength(2));
        //Click on the second deposit
        fireEvent.press(screen.getByText("50"));
        //Moves to the following screen -> currentState: receiverIndex:1, depositIndex:1, feeRate: "10"
        fireEvent.press(screen.getByText(translate("next")));

        // 2 - Withdraw page with correct info
        await waitFor(() => expect(translate("destination_wallet") + ":").toBeDefined());
        expect(screen.getByText("secondWallet" + " - " + formatAddress("0xMockedAddress", "middle", 3))).toBeDefined();
        expect(screen.getByText("50")).toBeDefined();
    });
});
