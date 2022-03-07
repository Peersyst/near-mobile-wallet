import * as UseNavigation from "module/common/hook/useNavigation";
import * as WalletStorage from "module/wallet/WalletStorage";
import * as Recoi from "recoil";
import { render } from "test-utils";
import CreateWalletSuccessScreen from "module/wallet/screen/CreateWalletSuccessScreen";
import * as UseCreateWallet from "module/wallet/hook/useCreateWallet";
import { MainScreens } from "module/main/MainNavigatorGroup";

describe("CreateWalletSuccessScreen tests", () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Sets wallet and navigates to main screen", () => {
        jest.useFakeTimers();
        const navigate = jest.fn();
        jest.spyOn(UseNavigation, "default").mockReturnValue({ navigate } as any);
        jest.spyOn(UseCreateWallet, "default").mockReturnValue({
            state: { name: "wallet", pin: "1234", mnemonic: ["pizza", "watermelon", "lemon"] },
            setPin: jest.fn(),
            setName: jest.fn(),
            setMnemonic: jest.fn(),
        });
        const setWalletState = jest.fn();
        jest.spyOn(Recoi, "useSetRecoilState").mockReturnValue(setWalletState);
        const setWalletStorage = jest
            .spyOn(WalletStorage.WalletStorage, "set")
            .mockImplementation(() => new Promise((resolve) => resolve(undefined)));

        render(<CreateWalletSuccessScreen />);

        expect(setWalletStorage).toHaveBeenCalledWith({ name: "wallet", pin: "1234", mnemonic: ["pizza", "watermelon", "lemon"] });
        jest.runAllTimers();
        expect(setWalletState).toHaveBeenCalledWith({ hasWallet: true, isAuthenticated: true, name: "wallet" });
        expect(navigate).toHaveBeenCalledWith(MainScreens.MAIN);
        jest.useRealTimers();
    });
});
