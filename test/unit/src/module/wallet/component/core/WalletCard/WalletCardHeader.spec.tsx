import { fireEvent, render } from "test-utils";
import * as Clipboard from "expo-clipboard";
import WalletCardHeader from "module/wallet/component/core/WalletCard/WalletCardHeader/WalletCardHeader";
import * as UseWallet from "module/wallet/hook/useWallet";
import { wallet } from "mocks/wallet";
import { CKBSDKService } from "module/common/service/CkbSdkService";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import { MnemonicMocked } from "mocks/MnemonicMocked";

describe("WalletCardHeader tests", () => {
    const sdkInstance = new CKBSDKService("testnet", MnemonicMocked);

    beforeAll(() => {
        jest.spyOn(UseWallet, "default").mockReturnValue(wallet);
        jest.spyOn(serviceInstancesMap, "get").mockReturnValue({ testnet: sdkInstance, mainnet: sdkInstance });
        jest.spyOn(sdkInstance, "getAddress").mockReturnValue("0xMockedAddress");
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", () => {
        const screen = render(<WalletCardHeader name="my_account" index={0} />);
        expect(screen.getByText("my_account")).toBeDefined();
        expect(screen.getByTestId("EditIcon")).toBeDefined();
        expect(screen.getByTestId("CopyIcon")).toBeDefined();
    });

    test("Copies correctly", () => {
        jest.spyOn(Clipboard, "setString");
        const screen = render(<WalletCardHeader name="my_account" index={0} />);
        const icon = screen.getByTestId("CopyIcon");
        expect(icon).toBeDefined();
        fireEvent.press(icon);
        expect(Clipboard.setString).toHaveBeenCalledWith("0xMockedAddress");
    });
});
