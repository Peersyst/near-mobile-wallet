import WalletsBackupAdvise from "module/wallet/component/core/WalletsBackupModal/WalletsBackupAdvise/WalletsBackupAdvise";
import { render, translate } from "test-utils";
import { act, fireEvent } from "@testing-library/react-native";
import { UseGetServiceInstanceMock, UseWalletStateMock } from "test-mocks";

describe("WalletBackupAdvise", () => {
    const { serviceInstance } = new UseGetServiceInstanceMock();
    const { state } = new UseWalletStateMock();

    afterEach(() => {
        jest.restoreAllMocks();
    });
    test("Renders correctly", () => {
        jest.useFakeTimers();
        const handleSelection = jest.fn();
        jest.spyOn(serviceInstance, "getCKBBalance").mockReturnValue({
            totalBalance: 1,
            occupiedBalance: 0,
            freeBalance: 1,
        });
        const screen = render(<WalletsBackupAdvise onWalletSelected={handleSelection} />);
        expect(screen.getByText(translate("backup_wallet_advise_text"))).toBeDefined();
        expect(screen.getByText("5s")).toBeDefined();
        for (let i = 0; i < 5; i++) act(() => jest.runOnlyPendingTimers());
        expect(screen.getByText(translate("back_up_now"))).toBeDefined();
        fireEvent.press(screen.getByText(translate("back_up_now")));
        fireEvent.press(screen.getByText(state.wallets[0].name));
        expect(handleSelection).toHaveBeenCalledWith(0);
        jest.useRealTimers();
    });
});
