import WalletsBackupAdvise from "module/wallet/component/core/WalletsBackupModal/WalletsBackupAdvise/WalletsBackupAdvise";
import { render, translate } from "test-utils";
import { act, fireEvent } from "@testing-library/react-native";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import { mockedUseWallet } from "mocks/useWalletState";
import { MnemonicMocked } from "mocks/MnemonicMocked";
import { CKBSDKService } from "module/common/service/CkbSdkService";
import { serviceInstancesMap } from "module/wallet/state/WalletState";

describe("WalletBackupAdvise", () => {
    const sdkInstance = new CKBSDKService("testnet", MnemonicMocked);

    afterEach(() => {
        jest.restoreAllMocks();
    });
    test("Renders correctly", async () => {
        jest.useFakeTimers();
        const handleSelection = jest.fn();
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(serviceInstancesMap, "get").mockReturnValue({ testnet: sdkInstance, mainnet: sdkInstance });
        jest.spyOn(sdkInstance, "getCKBBalance").mockReturnValue({
            totalBalance: 1,
            occupiedBalance: 0,
            freeBalance: 1,
        });
        const screen = render(<WalletsBackupAdvise onWalletSelected={handleSelection} />);
        expect(screen.getByText(translate("backup_wallet_advise_text"))).toBeDefined();
        expect(screen.getByText("5s")).toBeDefined();
        for (let i = 0; i < 5; i++) act(() => jest.runOnlyPendingTimers());
        jest.useRealTimers();
        expect(screen.getByText(translate("back_up_now"))).toBeDefined();
        const displayButton = screen.getByTestId("select-display-touchable");
        fireEvent.press(displayButton);
        expect(screen.getByText(translate("select_a_wallet"))).toBeDefined();
        const walletItems = await screen.findAllByText("1");
        expect(walletItems.length).toBe(2);
        fireEvent.press(walletItems[1]);
        expect(handleSelection).toHaveBeenCalledWith(1);
    });
});
