import * as WalletStorage from "module/wallet/WalletStorage";
import * as Recoil from "recoil";
import { render } from "test-utils";
import CreateWalletSuccessScreen from "module/wallet/screen/CreateWalletSuccessScreen";
import * as UseCreateWallet from "module/wallet/hook/useCreateWallet";

describe("CreateWalletSuccessScreen tests", () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Sets wallet and navigates to main screen", () => {
        jest.useFakeTimers();
        jest.spyOn(UseCreateWallet, "default").mockReturnValue({
            state: { name: "wallet", pin: "1234", mnemonic: ["pizza", "watermelon", "lemon"] },
            setPin: jest.fn(),
            setName: jest.fn(),
            setMnemonic: jest.fn(),
        });
        const setWalletState = jest.fn();
        jest.spyOn(Recoil, "useSetRecoilState").mockReturnValue(setWalletState);
        const setWalletStorage = jest
            .spyOn(WalletStorage.WalletStorage, "set")
            .mockImplementation(() => new Promise((resolve) => resolve(undefined)));

        render(<CreateWalletSuccessScreen />);

        expect(setWalletStorage).toHaveBeenCalledWith({
            name: "wallet",
            pin: "1234",
            mnemonic: ["pizza", "watermelon", "lemon"],
        });
        jest.runAllTimers();
        expect(setWalletState).toHaveBeenCalled();
        jest.useRealTimers();
    });
});
