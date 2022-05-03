import WalletsBackupAdvise from "module/wallet/component/core/WalletsBackupModal/WalletsBackupAdvise/WalletsBackupAdvise";
import { render } from "test-utils";
import { translate } from "locale";
import { act, fireEvent } from "@testing-library/react-native";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import { mockedUseWallet } from "mocks/useWalletState";
import { MnemonicMocked } from "mocks/MnemonicMocked";
import { CKBSDKService } from "module/common/service/CkbSdkService";
import { serviceInstancesMap } from "module/wallet/state/WalletState";

describe("WalletBackupAdvise", () => {
    const sdkInstance = new CKBSDKService(MnemonicMocked);

    afterEach(() => {
        jest.restoreAllMocks();
    });
    test("Renders correctly", () => {
        jest.useFakeTimers();
        const handleSelection = jest.fn();
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(serviceInstancesMap, "get").mockReturnValue(sdkInstance);
        jest.spyOn(sdkInstance, "getCKBBalance").mockReturnValue({
            totalBalance: 1,
            occupiedBalance: 0,
            freeBalance: 1,
        });
        const screen = render(<WalletsBackupAdvise onWalletSelected={handleSelection} />);
        screen.debug();
        expect(screen.getByText(translate("backup_wallet_advise_text"))).toBeDefined();
        expect(screen.getByText("... 5s")).toBeDefined();
        for (let i = 0; i < 5; i++) act(() => jest.runOnlyPendingTimers());
        expect(screen.getByText(translate("back_up_now"))).toBeDefined();
        fireEvent.press(screen.getByText(translate("back_up_now")));
        fireEvent.press(screen.getByText(mockedUseWallet.state.wallets[0].name));
        expect(handleSelection).toHaveBeenCalledWith(0);
        jest.useRealTimers();
    });
});
