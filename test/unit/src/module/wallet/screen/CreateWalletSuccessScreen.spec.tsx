import * as WalletStorage from "module/wallet/WalletStorage";
import * as SettingsStorage from "module/settings/SettingsStorage";
import * as Recoil from "recoil";
import { render } from "test-utils";
import CreateWalletSuccessScreen from "module/wallet/screen/CreateWalletSuccessScreen";
import * as UseCreateWallet from "module/wallet/hook/useCreateWallet";
import { defaultSettingsState } from "module/settings/state/SettingsState";

describe("CreateWalletSuccessScreen tests", () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Sets wallet and navigates to main screen", () => {
        jest.useFakeTimers();
        const walletState = { name: "wallet", pin: "1234", mnemonic: ["pizza", "watermelon", "lemon"] };
        jest.spyOn(UseCreateWallet, "default").mockReturnValue({
            state: walletState,
            setPin: jest.fn(),
            setName: jest.fn(),
            setMnemonic: jest.fn(),
        });
        const setWalletState = jest.fn();
        const setSettingsState = jest.fn();
        jest.spyOn(Recoil, "useSetRecoilState").mockImplementation((state: any) => {
            return state.key === "wallet" ? setWalletState : setSettingsState;
        });

        const setSettingsStorage = jest
            .spyOn(SettingsStorage.SettingsStorage, "set")
            .mockImplementation(() => new Promise((resolve) => resolve(undefined)));

        const setWalletStorage = jest
            .spyOn(WalletStorage.WalletStorage, "set")
            .mockImplementation(() => new Promise((resolve) => resolve(undefined)));

        render(<CreateWalletSuccessScreen />);

        expect(setWalletStorage).toHaveBeenCalledWith({
            name: "wallet",
            pin: "1234",
            mnemonic: ["pizza", "watermelon", "lemon"],
        });
        expect(setSettingsStorage).toHaveBeenCalledWith(defaultSettingsState);

        jest.runAllTimers();
        expect(setWalletState).toHaveBeenCalled();
        expect(setSettingsState).toHaveBeenCalled();
        jest.useRealTimers();
    });
});
