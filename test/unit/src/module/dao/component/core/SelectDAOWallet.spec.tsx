import { fireEvent, render, waitFor } from "test-utils";
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

    test("Renders correctly", async () => {
        jest.spyOn(UseWalletState, "default").mockReturnValue(mockedUseWallet);
        jest.spyOn(serviceInstancesMap, "get").mockReturnValue({ testnet: sdkInstance, mainnet: sdkInstance });
        jest.spyOn(sdkInstance, "getCKBBalance").mockReturnValue({
            totalBalance: 20000,
            occupiedBalance: 9600,
            freeBalance: 14567,
        });
        const screen = render(<SelectDAOWallet />);
        expect(await screen.findByText("14,567")).toBeDefined();
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
        fireEvent.press(walletCardIcon);
        const walletItems = await screen.findAllByText(screen.getByText("14,567"));
        expect(walletItems.length).toBe(2);
        fireEvent.press(walletItems[1]);
        expect(setSelectedWallet).toBeCalledWith(1);
    });
});
