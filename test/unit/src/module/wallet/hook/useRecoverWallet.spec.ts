import useRecoverWallets from "module/wallet/hook/useRecoverWallets";
import { Chains } from "near-peersyst-sdk";
import { renderHook, waitFor } from "test-utils";
import * as Recoil from "recoil";
import { WalletStorage } from "module/wallet/WalletStorage";
import { SecureWalletInfoMock, UnencryptedWalletInfoMock, WalletMock } from "test-mocks";
import WalletController from "module/wallet/utils/WalletController";
import { ImportWalletsReturnMock, WalletControllerRecoverMock } from "mocks/common/wallet/walletController.mock";

export const renderUseRecoverWallets = () => {
    return renderHook(() => {
        const recoverWallets = useRecoverWallets();
        return recoverWallets;
    }).result.current;
};

describe("useRecoverWallets tests", () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Return false if no have previous wallets", async () => {
        jest.spyOn(WalletStorage, "getWallets").mockResolvedValue([]);
        jest.spyOn(WalletStorage, "getSecureWallets").mockResolvedValue([]);
        const recoverWallets = renderUseRecoverWallets();
        const hasPreviousWallet = await recoverWallets(Chains.TESTNET);
        expect(hasPreviousWallet).toBe(false);
    });

    test("Recover wallets but do not update storage", async () => {
        //Mock state
        const mockedSetWalletState = jest.fn();
        jest.spyOn(Recoil, "useSetRecoilState").mockReturnValue(mockedSetWalletState);
        //Mock storage
        //Getters
        const wallet1 = new UnencryptedWalletInfoMock();
        const wallet2 = new UnencryptedWalletInfoMock({ index: 1 });
        const secureWallet = [new SecureWalletInfoMock({ walletIds: [0, 1] })];
        const walletStorage = [wallet1, wallet2];
        jest.spyOn(WalletStorage, "getWallets").mockResolvedValue(walletStorage);
        jest.spyOn(WalletStorage, "getSecureWallets").mockResolvedValue(secureWallet);
        const returnMock = new ImportWalletsReturnMock({
            wallets: [new WalletMock(wallet1), new WalletMock(wallet2)],
            newStorageWallets: walletStorage,
            newSecureWallets: secureWallet,
            updateSecure: false,
        });
        //Setters
        const setSecureMock = jest.spyOn(WalletStorage, "setSecureWallets");
        const setUnencryptedMock = jest.spyOn(WalletStorage, "setUnencryptedWallets");
        const { recoverWallets: recoverWalletMock } = new WalletControllerRecoverMock({ returnMock });
        const recoverWallets = renderUseRecoverWallets();
        const network = Chains.TESTNET;
        const hasPreviousWallet = await recoverWallets(network);
        await waitFor(() => expect(recoverWalletMock).toBeCalledWith(network, walletStorage, secureWallet));
        expect(setSecureMock).not.toBeCalledWith(secureWallet, network);
        expect(setUnencryptedMock).not.toBeCalledWith(walletStorage, network); //Same wallets
        expect(hasPreviousWallet).toBe(true);
    });

    test("Recover wallets and update storage", async () => {
        //Mock state
        const mockedSetWalletState = jest.fn();
        jest.spyOn(Recoil, "useSetRecoilState").mockReturnValue(mockedSetWalletState);
        //Mock storage
        //Getters
        const wallet1 = new UnencryptedWalletInfoMock();
        const wallet2 = new UnencryptedWalletInfoMock({ index: 1 });
        const secureWallet = [new SecureWalletInfoMock({ walletIds: [0] })];
        const walletStorage = [wallet1];
        jest.spyOn(WalletStorage, "getWallets").mockResolvedValue(walletStorage);
        jest.spyOn(WalletStorage, "getSecureWallets").mockResolvedValue(secureWallet);
        const returnMock = new ImportWalletsReturnMock({
            wallets: [new WalletMock(wallet1), new WalletMock(wallet2)],
            newStorageWallets: [...walletStorage, wallet2],
            newSecureWallets: [new SecureWalletInfoMock({ walletIds: [0, 1] })],
            updateSecure: true,
        });
        //Setters
        const setSecureMock = jest.spyOn(WalletStorage, "setSecureWallets");
        const setUnencryptedMock = jest.spyOn(WalletStorage, "setUnencryptedWallets");
        const { recoverWallets: recoverWalletMock } = new WalletControllerRecoverMock({ returnMock });
        const recoverWallets = renderUseRecoverWallets();
        const network = Chains.TESTNET;
        const hasPreviousWallet = await recoverWallets(network);
        await waitFor(() => expect(recoverWalletMock).toBeCalledWith(network, walletStorage, secureWallet));
        await waitFor(() => expect(setSecureMock).toBeCalledWith(returnMock.newSecureWallets, network));
        expect(setUnencryptedMock).toBeCalledWith(returnMock.newStorageWallets, network); //Same wallets
        expect(hasPreviousWallet).toBe(true);
    });
});
