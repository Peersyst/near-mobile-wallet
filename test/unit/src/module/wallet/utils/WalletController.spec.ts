import { MnemonicMocked } from "mocks/MnemonicMocked";
import { NetworkType } from "module/settings/state/SettingsState";
import ServiceInstance from "module/wallet/state/ServiceInstance/ServiceInstance";
import WalletController from "module/wallet/utils/WalletController";
import { WalletStorage } from "module/wallet/WalletStorage";
import { Chains } from "near-peersyst-sdk";
import { WalletControllerMocks } from "test-mocks";

describe("Test for the WalletController", () => {
    let network: NetworkType = Chains.TESTNET;
    const pin = "1234";
    const mnemonic = MnemonicMocked;
    const privateKey = "pK";
    const mockedSetSecure = jest.fn();
    const mockedSetUnencryptedWallets = jest.fn();
    const mockedSetSecureWallets = jest.fn();
    const mockedSetWalletIds = jest.fn();

    beforeEach(() => {
        jest.resetAllMocks();
        jest.spyOn(WalletStorage, "setSecure").mockImplementation(mockedSetSecure);
        jest.spyOn(WalletStorage, "setUnencryptedWallets").mockImplementation(mockedSetUnencryptedWallets);
        jest.spyOn(WalletStorage, "setSecureWallets").mockImplementation(mockedSetSecureWallets);
        jest.spyOn(WalletStorage, "setSecureWalletIds").mockImplementation(mockedSetWalletIds);
    });

    describe("Import wallet test", () => {
        test("Import wallet with pin and mnemonic ", async () => {
            const { accounts } = new WalletControllerMocks(1, privateKey);
            jest.spyOn(ServiceInstance, "createServiceInstance").mockResolvedValue(accounts);

            const { wallets } = await WalletController.importWallets(network, pin, mnemonic);
            //Updates unencrypted storage
            expect(mockedSetSecure).toHaveBeenCalledWith({
                pin,
                mnemonic,
                testnet: [{ privateKey, walletIds: [0] }],
                mainnet: [],
            });
            //Do not update encrypted storage
            expect(mockedSetWalletIds).not.toHaveBeenCalled();
            //Import one wallet
            expect(wallets).toHaveLength(1);
        });
        test("Import wallets without pin and mnemonic but with privateKey with multiple account ", async () => {
            const length = 10;
            network = Chains.MAINNET;
            const { accounts, walletIds, storageWallets } = new WalletControllerMocks(length, privateKey);
            jest.spyOn(ServiceInstance, "createServiceInstance").mockResolvedValue(accounts);

            const { wallets } = await WalletController.importWallets(network, undefined, undefined, privateKey);
            //Updates unencrypted storage
            expect(mockedSetUnencryptedWallets).toHaveBeenCalledWith(storageWallets, network);
            //Update encrypted storage
            expect(mockedSetWalletIds).toHaveBeenCalledWith(walletIds, privateKey, network);
            //Import the wallets
            expect(wallets).toHaveLength(length);
        });
    });

    describe("Recover wallets test", () => {
        test("Recovers without accounts", async () => {
            jest.spyOn(WalletStorage, "getWallets").mockResolvedValue([]);
            jest.spyOn(WalletStorage, "getSecureWallets").mockResolvedValue([]);
            const { wallets } = await WalletController.recoverWallets(network);
            //Do not recover any wallet due to not having any in storage
            expect(wallets).toHaveLength(0);
        });

        test("Recovers stored wallet. No accounts created outside the app", async () => {
            const { accounts, walletIds, storageWallets } = new WalletControllerMocks(1, privateKey);
            jest.spyOn(WalletStorage, "getWallets").mockResolvedValue(storageWallets);
            jest.spyOn(WalletStorage, "getSecureWallets").mockResolvedValue([{ privateKey, walletIds }]);
            jest.spyOn(ServiceInstance, "addServiceInstances").mockResolvedValue(accounts);

            const { wallets } = await WalletController.recoverWallets(network);
            //Do not save anything in storage
            expect(mockedSetSecureWallets).not.toHaveBeenCalled();
            expect(mockedSetUnencryptedWallets).not.toHaveBeenCalled();
            //Recover the wallet to save it in state
            expect(wallets).toHaveLength(1);
        });

        test("Recovers stored wallet. Some accounts created outside the app", async () => {
            const { accounts, walletIds, storageWallets } = new WalletControllerMocks(1, privateKey);
            const { accounts: newAccounts, storageWallets: newStorageWallets } = new WalletControllerMocks(2, privateKey, 1);
            jest.spyOn(WalletStorage, "getWallets").mockResolvedValue(storageWallets);
            jest.spyOn(WalletStorage, "getSecureWallets").mockResolvedValue([{ privateKey, walletIds }]);
            jest.spyOn(ServiceInstance, "addServiceInstances").mockResolvedValue([...accounts, ...newAccounts]);

            const { wallets } = await WalletController.recoverWallets(network);
            //Do not save anything in storage
            expect(mockedSetSecureWallets).toHaveBeenCalledWith(
                [
                    {
                        privateKey,
                        walletIds: [0, 1, 2],
                    },
                ],
                network,
            );
            expect(mockedSetUnencryptedWallets).toHaveBeenCalledWith([...storageWallets, ...newStorageWallets], network);
            //Recover the wallet to save it in state
            expect(wallets).toHaveLength(3);
        });

        test("Recovers some wallets with differents keys. No accounts created outside the app", async () => {
            const length1 = 3;
            const length2 = 8;
            const { accounts, walletIds, storageWallets } = new WalletControllerMocks(length1, privateKey);
            const {
                accounts: accounts2,
                walletIds: walletIds2,
                storageWallets: storageWallets2,
            } = new WalletControllerMocks(length2, "pk2", length1);
            const newStorageWallets = [...storageWallets, ...storageWallets2];
            jest.spyOn(WalletStorage, "getWallets").mockResolvedValue([...storageWallets, ...storageWallets2]);
            jest.spyOn(WalletStorage, "getSecureWallets").mockResolvedValue([
                { privateKey, walletIds },
                { privateKey: "pk2", walletIds: walletIds2 },
            ]);
            jest.spyOn(ServiceInstance, "addServiceInstances").mockResolvedValueOnce(accounts);
            jest.spyOn(ServiceInstance, "addServiceInstances").mockResolvedValueOnce(accounts2);

            const { wallets } = await WalletController.recoverWallets(network);
            //Do not save anything in the storage
            expect(mockedSetSecureWallets).not.toHaveBeenCalled();
            expect(mockedSetUnencryptedWallets).not.toHaveBeenCalledWith(newStorageWallets);
            //Recover the wallet to save it in state
            expect(wallets).toHaveLength(length1 + length2);
        });
    });
});
