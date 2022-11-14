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
        expect(screen.getByText(translate("back_up_now"))).toBeDefined();
        fireEvent.press(screen.getByText(translate("back_up_now")));
        const wallet = await screen.findByText(mockedUseWallet.state.wallets[0].name);
        fireEvent.press(wallet);
        expect(handleSelection).toHaveBeenCalledWith(0);
        jest.useRealTimers();
    });
});
