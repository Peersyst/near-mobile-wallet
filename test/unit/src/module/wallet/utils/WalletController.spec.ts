import { MnemonicMocked } from "mocks/MnemonicMocked";
import { NetworkType } from "module/settings/state/SettingsState";
import ServiceInstances from "module/wallet/state/ServiceInstances/ServiceInstances";
import WalletController from "module/wallet/utils/WalletController";
import { WalletUtils } from "module/wallet/utils/WalletUtils";
import { WalletStorage } from "module/wallet/WalletStorage";
import { Chains, NearSDKService } from "near-peersyst-sdk";
import {
    WalletControllerMocks,
    SecureWalletStorageTypeMock,
    MOCKED_PK,
    NearSdkServiceMock,
    MOCKED_SECOND_PRIVATE_KEY,
    MOCKED_THIRD_PRIVATE_KEY,
} from "test-mocks";

describe("Test for the WalletController", () => {
    let network: NetworkType = Chains.TESTNET;
    const pin = "1234";
    const mnemonic = MnemonicMocked;
    const privateKey = MOCKED_PK;
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

    describe("Create new wallet test", () => {
        const newAcc = "newAcc";

        test("Create new wallet test", async () => {
            const service = new NearSdkServiceMock() as any as NearSDKService;
            jest.spyOn(WalletStorage, "getMainPrivateKey").mockResolvedValue(privateKey);
            jest.spyOn(WalletStorage, "addNewUnencryptedWallet").mockResolvedValue(3);
            const mockedAddService = jest.spyOn(ServiceInstances, "addService");
            const wallet = await WalletController.createNewWallet(newAcc, service, network);
            expect(mockedAddService).toHaveBeenCalledWith({ service, network });
            expect(wallet).toEqual({ index: 3, account: newAcc, colorIndex: WalletUtils.getWalletColor(newAcc) });
        });
    });

    describe("Import wallet test", () => {
        test("Import wallet with pin and mnemonic ", async () => {
            //Mocks
            const { accounts } = new WalletControllerMocks(1, privateKey);
            jest.spyOn(ServiceInstances, "addServiceInstances").mockResolvedValue(accounts);

            const { wallets } = await WalletController.importWallets(network, pin, mnemonic);
            //Updates unencrypted storage
            expect(mockedSetSecure).toHaveBeenCalledWith({
                pin,
                mnemonic,
                testnet: [{ privateKey, walletIds: [0] }],
                mainnet: [],
                mainPrivateKey: privateKey,
            });
            //Do not update encrypted storage
            expect(mockedSetWalletIds).not.toHaveBeenCalled();
            //Import one wallet
            expect(wallets).toHaveLength(1);
        });

        test("Import wallets without pin and without mnemonic but with privateKey and with multiple account ", async () => {
            const length = 10;
            network = Chains.MAINNET;
            const { accounts, walletIds, storageWallets } = new WalletControllerMocks(length, MOCKED_SECOND_PRIVATE_KEY, undefined);
            jest.spyOn(ServiceInstances, "addServiceInstances").mockResolvedValue(accounts);

            const { wallets } = await WalletController.importWallets(network, undefined, undefined, MOCKED_SECOND_PRIVATE_KEY);
            //Updates unencrypted storage
            expect(mockedSetUnencryptedWallets).toHaveBeenCalledWith(storageWallets, network);
            //Update encrypted storage
            expect(mockedSetWalletIds).toHaveBeenCalledWith(walletIds, MOCKED_SECOND_PRIVATE_KEY, network);
            //Import the wallets
            expect(wallets).toHaveLength(length);
            expect(wallets[0].imported).toBe(true);
        });

        test("Do not allow to import same mnemonic", async () => {
            jest.spyOn(WalletStorage, "getSecure").mockResolvedValue({
                mnemonic,
                testnet: [],
                mainnet: [],
                pin: "1234",
                mainPrivateKey: privateKey,
            });
            const { wallets } = await WalletController.importWallets(network, pin, mnemonic);
            //Updates unencrypted storage
            expect(mockedSetSecure).not.toHaveBeenCalled();
            //Do not update encrypted storage
            expect(mockedSetWalletIds).not.toHaveBeenCalled();
            //Import one wallet
            expect(wallets).toHaveLength(0);
        });

        test("Do not allow to import with same private key", async () => {
            network = Chains.TESTNET;
            jest.spyOn(WalletStorage, "getSecure").mockResolvedValue({
                mnemonic,
                testnet: [{ privateKey, walletIds: [1] }],
                mainnet: [],
                pin: "1234",
                mainPrivateKey: privateKey,
            });
            const { wallets } = await WalletController.importWallets(network, pin, undefined, privateKey);
            //Updates unencrypted storage
            expect(mockedSetSecure).not.toHaveBeenCalled();
            //Do not update encrypted storage
            expect(mockedSetWalletIds).not.toHaveBeenCalled();
            //Import one wallet
            expect(wallets).toHaveLength(0);
        });
    });

    describe("Recover wallets test", () => {
        test("Recovers without accounts", async () => {
            jest.spyOn(WalletStorage, "getWallets").mockResolvedValue([]);
            new SecureWalletStorageTypeMock();

            const { wallets } = await WalletController.recoverWallets(network);
            //Do not recover any wallet due to not having any in storage
            expect(wallets).toHaveLength(0);
        });

        test("Recovers stored wallet. No accounts created/deleted outside the app", async () => {
            const { accounts, walletIds, storageWallets } = new WalletControllerMocks(1, privateKey);
            jest.spyOn(WalletStorage, "getWallets").mockResolvedValue(storageWallets);
            new SecureWalletStorageTypeMock({ [network]: [{ privateKey, walletIds }] });

            jest.spyOn(ServiceInstances, "recoverServiceInstances").mockResolvedValue(accounts);

            const { wallets } = await WalletController.recoverWallets(network);
            //Do not save anything in storage
            expect(mockedSetSecureWallets).not.toHaveBeenCalled();
            expect(mockedSetUnencryptedWallets).not.toHaveBeenCalled();
            //Recover the wallet to save it in state
            expect(wallets).toHaveLength(1);
            expect(wallets[0].index).toBe(0);
        });

        test("Recovers stored wallet. Some accounts created/deleted outside the app", async () => {
            const { accounts, walletIds, storageWallets } = new WalletControllerMocks(1, privateKey);
            const { accounts: newAccounts, storageWallets: newStorageWallets } = new WalletControllerMocks(2, privateKey, 1);

            jest.spyOn(WalletStorage, "getWallets").mockResolvedValue(storageWallets);
            jest.spyOn(WalletStorage, "getSecureWallets").mockResolvedValue([{ privateKey, walletIds }]);
            new SecureWalletStorageTypeMock({ [network]: [{ privateKey, walletIds }] });

            jest.spyOn(ServiceInstances, "recoverServiceInstances").mockResolvedValue([...accounts, ...newAccounts]);

            const { wallets } = await WalletController.recoverWallets(network);
            //Save with the walletIds
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
            //Check order
            for (const [index, wallet] of wallets.entries()) {
                expect(wallet.index).toBe(index);
            }
        });

        test("Recovers some wallets with differents keys. No accounts created/deleted outside the app", async () => {
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
            new SecureWalletStorageTypeMock({
                [network]: [
                    { privateKey, walletIds },
                    { privateKey: "pk2", walletIds: walletIds2 },
                ],
            });

            jest.spyOn(ServiceInstances, "recoverServiceInstances").mockResolvedValueOnce(accounts);
            jest.spyOn(ServiceInstances, "recoverServiceInstances").mockResolvedValueOnce(accounts2);

            const { wallets } = await WalletController.recoverWallets(network);
            //Do not save anything in the storage
            expect(mockedSetSecureWallets).not.toHaveBeenCalled();
            expect(mockedSetUnencryptedWallets).not.toHaveBeenCalledWith(newStorageWallets);
            //Recover the wallet to save it in state
            expect(wallets).toHaveLength(length1 + length2);
            //Check order
            for (const [index, wallet] of wallets.entries()) {
                expect(wallet.index).toBe(index);
            }
        });

        test("Recovers some wallets with differents keys. Some accounts deleted outside the app", async () => {
            const length = 2;
            const { walletIds, storageWallets } = new WalletControllerMocks(length, privateKey);
            const {
                accounts: accounts2,
                walletIds: walletIds2,
                storageWallets: storageWallets2,
            } = new WalletControllerMocks(length - 1, privateKey);

            jest.spyOn(WalletStorage, "getWallets").mockResolvedValue(storageWallets);
            new SecureWalletStorageTypeMock({ [network]: [{ privateKey, walletIds }] });

            //Return one less account than in the storage
            jest.spyOn(ServiceInstances, "recoverServiceInstances").mockResolvedValueOnce(accounts2);

            const { wallets } = await WalletController.recoverWallets(network);
            //Save with the walletIds
            expect(mockedSetSecureWallets).toHaveBeenCalledWith(
                [
                    {
                        privateKey,
                        walletIds: walletIds2,
                    },
                ],
                network,
            );
            expect(mockedSetUnencryptedWallets).toHaveBeenCalledWith(storageWallets2, network);
            //Recover the wallet to save it in state
            expect(wallets).toHaveLength(accounts2.length);
            //Check order
            for (const [index, wallet] of wallets.entries()) {
                expect(wallet.index).toBe(index);
            }
        });

        test("Delete all previous accounts, and adds 3 more", async () => {
            const length = 2;
            const length2 = 3;
            const { walletIds, storageWallets } = new WalletControllerMocks(length, privateKey);
            const { accounts: accounts2, storageWallets: storageWallets2 } = new WalletControllerMocks(length2, privateKey, length);

            jest.spyOn(WalletStorage, "getWallets").mockResolvedValue(storageWallets);
            new SecureWalletStorageTypeMock({ [network]: [{ privateKey, walletIds }] });

            //Return one less account than in the storage
            jest.spyOn(ServiceInstances, "recoverServiceInstances").mockResolvedValueOnce(accounts2);

            const { wallets } = await WalletController.recoverWallets(network);
            //Save with the walletIds
            expect(mockedSetSecureWallets).toHaveBeenCalledWith(
                [
                    {
                        privateKey,
                        walletIds: [0, 1, 2],
                    },
                ],
                network,
            );
            expect(mockedSetUnencryptedWallets).toHaveBeenCalledWith(
                storageWallets2.map((w, i) => ({ ...w, index: i })),
                network,
            );
            //Recover the wallet to save it in state
            expect(wallets).toHaveLength(accounts2.length);
            //Check order
            for (const [index, wallet] of wallets.entries()) {
                expect(wallet.index).toBe(index);
                expect(wallet.imported).toBe(undefined);
            }
        });

        test("1st PrivateKey: Delete all accounts, 2nd: same accounts, 3rd: add 2 accounts", async () => {
            const length0i = 2;
            const length1 = 3;
            const length2i = 2;
            const length2f = 4;

            //Return 0 accounts
            const { walletIds, storageWallets } = new WalletControllerMocks(length0i, privateKey);
            jest.spyOn(ServiceInstances, "recoverServiceInstances").mockResolvedValueOnce([]);

            //Return same accounts
            const {
                accounts: accounts1,
                walletIds: walletIds1,
                storageWallets: storageWallets1,
            } = new WalletControllerMocks(length1, MOCKED_SECOND_PRIVATE_KEY, length0i);
            jest.spyOn(ServiceInstances, "recoverServiceInstances").mockResolvedValueOnce(accounts1);

            //Add 2 accounts
            const { walletIds: walletIds2, storageWallets: storageWallets2 } = new WalletControllerMocks(
                length2i,
                MOCKED_THIRD_PRIVATE_KEY,
                length0i + length1,
            );
            const { accounts: accounts2f, storageWallets: storageWallets2f } = new WalletControllerMocks(
                length2f,
                MOCKED_THIRD_PRIVATE_KEY,
                length0i + length1,
            );
            jest.spyOn(ServiceInstances, "recoverServiceInstances").mockResolvedValueOnce(accounts2f);

            jest.spyOn(WalletStorage, "getWallets").mockResolvedValue([...storageWallets, ...storageWallets1, ...storageWallets2]);
            new SecureWalletStorageTypeMock({
                [network]: [
                    { privateKey: privateKey, walletIds },
                    { privateKey: MOCKED_SECOND_PRIVATE_KEY, walletIds: walletIds1 },
                    { privateKey: MOCKED_THIRD_PRIVATE_KEY, walletIds: walletIds2 },
                ],
            });

            const { wallets } = await WalletController.recoverWallets(network);
            //Save with the walletIds
            expect(mockedSetSecureWallets).toHaveBeenCalledWith(
                [
                    { privateKey: privateKey, walletIds: [] },
                    { privateKey: MOCKED_SECOND_PRIVATE_KEY, walletIds: [0, 1, 2] },
                    { privateKey: MOCKED_THIRD_PRIVATE_KEY, walletIds: [3, 4, 5, 6] },
                ],
                network,
            );
            const expectedWallets = [
                ...storageWallets1.map((w, i) => ({ ...w, index: i })),
                ...storageWallets2f.map((w, i) => ({ ...w, index: i + 3 })),
            ];

            expect(mockedSetUnencryptedWallets).toHaveBeenCalledWith(expectedWallets, network);
            //Recover the wallet to save it in state
            expect(wallets).toHaveLength(7);
            //Check order
            for (const [index, wallet] of wallets.entries()) {
                expect(wallet.index).toBe(index);
                expect(wallet.imported).toBe(true); //All the accounts will be imported
            }
        });
    });
});
