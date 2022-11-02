import { fireEvent, render, waitFor } from "test-utils";
import * as UseWalletState from "module/wallet/hook/useWalletState";
import SelectDAOWallet from "module/dao/component/core/DAOAccountCard/DAOCardHeader/SelectDAOWallet/SelectDAOWallet";
import { CKBSDKService } from "module/common/service/CkbSdkService";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import { MnemonicMocked } from "mocks/MnemonicMocked";
import createUseWalletStateMock, { mockedUseWallet } from "mocks/common/wallet/useWalletState";

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
        await waitFor(() => expect(screen.getAllByText("14,567")).toHaveLength(2));
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
        await waitFor(() => expect(screen.getAllByText("14,567")).toHaveLength(2));
        const walletItem = screen.getAllByText("14,567")[1];
        fireEvent.press(walletItem);
        expect(setSelectedWallet).toBeCalledWith(1);
    });
});
