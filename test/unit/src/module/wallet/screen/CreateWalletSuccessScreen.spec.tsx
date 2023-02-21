import { SettingsStorage } from "module/settings/SettingsStorage";
import * as Recoil from "recoil";
import { render, wait, act } from "test-utils";
import CreateWalletSuccessScreen from "module/wallet/screen/CreateWalletSuccessScreen";
import { defaultSettingsState } from "module/settings/state/SettingsState";
import * as UseImportWallets from "module/wallet/hook/useImportWallets";

describe("CreateWalletSuccessScreen tests", () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Sets wallet and navigates to main screen", async () => {
        const resetWalletState = jest.fn();
        jest.spyOn(Recoil, "useResetRecoilState").mockReturnValue(resetWalletState);
        const setSettingsStorage = jest.spyOn(SettingsStorage, "set").mockResolvedValue();
        const mockedImportWallets = jest.fn().mockResolvedValue({ wallets: [] });
        jest.spyOn(UseImportWallets, "default").mockReturnValue(mockedImportWallets);
        render(<CreateWalletSuccessScreen />);
        await act(() => wait(1000));
        expect(setSettingsStorage).toHaveBeenCalledWith(expect.objectContaining(defaultSettingsState));
        expect(mockedImportWallets).toHaveBeenCalled();
        expect(resetWalletState).toHaveBeenCalled();
    });
});
