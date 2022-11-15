import { fireEvent, render, translate, waitFor } from "test-utils";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import createUseWalletStateMock, { mockedUseWallet } from "mocks/useWalletState";
import SelectDAOWallet from "module/dao/component/core/DAOAccountCard/DAOCardHeader/SelectDAOWallet/SelectDAOWallet";
import { CKBSDKService } from "module/common/service/CkbSdkService";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import { MnemonicMocked } from "mocks/MnemonicMocked";

describe("Test for the SelectDAOWallet", () => {
    const sdkInstance = new CKBSDKService("testnet", MnemonicMocked);

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", () => {
        const screen = render(<SelectDAOWallet />);
        const walletCardIcon = screen.getByTestId("FilledWalletIcon");
        expect(walletCardIcon).toBeDefined();
    });
    test("Updates global selectedWallet correctly", async () => {
        const setSelectedWallet = jest.fn();
        jest.spyOn(UseWalletState, "default").mockReturnValue(createUseWalletStateMock({ setSelectedWallet }));
        jest.spyOn(serviceInstancesMap, "get").mockReturnValue({ testnet: sdkInstance, mainnet: sdkInstance });
        jest.spyOn(sdkInstance, "getCKBBalance").mockReturnValue({
            totalBalance: 20000,
            occupiedBalance: 9600,
            freeBalance: 14567,
        });
        const screen = render(<SelectDAOWallet />);
        const walletCardIcon = screen.getByTestId("FilledWalletIcon");
        expect(walletCardIcon).toBeDefined();
        fireEvent.press(walletCardIcon);
        expect(screen.getByText(translate("select_a_wallet"))).toBeDefined();
        const walletItems = screen.getAllByText("14,567");
        expect(walletItems.length).toBe(2);
        fireEvent.press(walletItems[1]);
        expect(setSelectedWallet).toBeCalledWith(1);
    });
});
