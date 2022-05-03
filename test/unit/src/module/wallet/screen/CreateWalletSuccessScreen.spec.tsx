import { WalletStorage } from "module/wallet/WalletStorage";
import { SettingsStorage } from "module/settings/SettingsStorage";
import * as Recoil from "recoil";
import { render, SuccessApiCall } from "test-utils";
import CreateWalletSuccessScreen from "module/wallet/screen/CreateWalletSuccessScreen";
import * as UseCreateWallet from "module/wallet/hook/useCreateWallet";
import { defaultSettingsState } from "module/settings/state/SettingsState";
import { CreateWalletState } from "module/wallet/state/CreateWalletState";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import { CKBSDKService } from "module/common/service/CkbSdkService";
import synchronizeMock from "mocks/synchronize";
import { MnemonicMocked } from "mocks/MnemonicMocked";

describe("CreateWalletSuccessScreen tests", () => {
    const sdkInstance = new CKBSDKService(MnemonicMocked);

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Sets wallet and navigates to main screen", async () => {
        jest.useFakeTimers();
        const walletState: CreateWalletState = { name: "wallet", pin: "1234", mnemonic: ["pizza", "watermelon", "lemon"], colorIndex: 0 };
        jest.spyOn(UseCreateWallet, "default").mockReturnValue({
            state: walletState,
            setPin: jest.fn(),
            setName: jest.fn(),
            setMnemonic: jest.fn(),
            setColorIndex: jest.fn(),
            reset: jest.fn(),
        });
        jest.spyOn(serviceInstancesMap, "get").mockReturnValue(sdkInstance);
        jest.spyOn(serviceInstancesMap, "has").mockReturnValue(true);
        jest.spyOn(sdkInstance, "synchronize").mockReturnValue(SuccessApiCall(synchronizeMock));
        const setWalletState = jest.fn();
        const setSettingsState = jest.fn();
        jest.spyOn(Recoil, "useSetRecoilState").mockImplementation((state: any) => {
            return state.key === "wallet" ? setWalletState : setSettingsState;
        });

        const setSettingsStorage = jest.spyOn(SettingsStorage, "set").mockImplementation(() => new Promise((resolve) => resolve()));

        const setWalletStorage = jest.spyOn(WalletStorage, "set").mockImplementation(() => new Promise((resolve) => resolve()));

        render(<CreateWalletSuccessScreen />);

        jest.runAllTimers();
        expect(setWalletStorage).toHaveBeenCalledWith(
            expect.objectContaining({
                pin: "1234",
                wallets: [{ name: "wallet", colorIndex: 0, mnemonic: ["pizza", "watermelon", "lemon"], index: 0 }],
            }),
        );
        expect(setSettingsStorage).toHaveBeenCalledWith(expect.objectContaining(defaultSettingsState));
        expect(setWalletState).toHaveBeenCalled();
        expect(setSettingsState).toHaveBeenCalled();
        jest.useRealTimers();
    });
});
