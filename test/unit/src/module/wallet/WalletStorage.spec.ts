import { BaseStorageService } from "module/common/service/BaseStorageService";
import { SuccessApiCall } from "test-utils";
import { WalletStorage } from "module/wallet/WalletStorage";
import { createStorageWallet, storageWallet } from "mocks/storageWallet";

describe("WalletStorage tests", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    describe("getWallets", () => {
        test("There are no wallets", async () => {
            jest.spyOn(BaseStorageService.prototype, "get").mockReturnValue(SuccessApiCall(null));
            expect(await WalletStorage.getWallets()).toBeUndefined();
        });

        test("There are wallets", async () => {
            jest.spyOn(BaseStorageService.prototype, "get").mockReturnValue(SuccessApiCall({ wallets: [storageWallet] }));
            expect(await WalletStorage.getWallets()).toEqual([storageWallet]);
        });
    });

    describe("getWallet", () => {
        test("There are no wallets", async () => {
            jest.spyOn(BaseStorageService.prototype, "get").mockReturnValue(SuccessApiCall(null));
            expect(await WalletStorage.getWallet(0)).toBeUndefined();
        });

        test("There are wallets", async () => {
            jest.spyOn(BaseStorageService.prototype, "get").mockReturnValue(SuccessApiCall({ wallets: [storageWallet] }));
            expect(await WalletStorage.getWallet(0)).toEqual(storageWallet);
        });
    });

    describe("getName", () => {
        test("There are no wallets", async () => {
            jest.spyOn(BaseStorageService.prototype, "get").mockReturnValue(SuccessApiCall(null));
            expect(await WalletStorage.getName(0)).toBeUndefined();
        });

        test("There are wallets", async () => {
            jest.spyOn(BaseStorageService.prototype, "get").mockReturnValue(SuccessApiCall({ wallets: [storageWallet] }));
            expect(await WalletStorage.getName(0)).toEqual(storageWallet.name);
        });
    });

    describe("getColorIndex", () => {
        test("There are no wallets", async () => {
            jest.spyOn(BaseStorageService.prototype, "get").mockReturnValue(SuccessApiCall(null));
            expect(await WalletStorage.getColorIndex(0)).toBeUndefined();
        });

        test("There are wallets", async () => {
            jest.spyOn(BaseStorageService.prototype, "get").mockReturnValue(SuccessApiCall({ wallets: [storageWallet] }));
            expect(await WalletStorage.getColorIndex(0)).toEqual(storageWallet.colorIndex);
        });
    });

    describe("getMnemonic", () => {
        test("There are no wallets", async () => {
            jest.spyOn(BaseStorageService.prototype, "get").mockReturnValue(SuccessApiCall(null));
            expect(await WalletStorage.getMnemonic(0)).toBeUndefined();
        });

        test("There are wallets", async () => {
            jest.spyOn(BaseStorageService.prototype, "get").mockReturnValue(SuccessApiCall({ wallets: [storageWallet] }));
            expect(await WalletStorage.getMnemonic(0)).toEqual(storageWallet.mnemonic);
        });
    });

    describe("getInitialState", () => {
        test("There are no wallets", async () => {
            jest.spyOn(BaseStorageService.prototype, "get").mockReturnValue(SuccessApiCall(null));
            expect(await WalletStorage.getInitialState(0)).toBeUndefined();
        });

        test("There are wallets", async () => {
            jest.spyOn(BaseStorageService.prototype, "get").mockReturnValue(SuccessApiCall({ wallets: [storageWallet] }));
            expect(await WalletStorage.getInitialState(0)).toBeUndefined();
        });
    });

    describe("getPin", () => {
        test("There are no wallets", async () => {
            jest.spyOn(BaseStorageService.prototype, "get").mockReturnValue(SuccessApiCall(null));
            expect(await WalletStorage.getMnemonic(0)).toBeUndefined();
        });

        test("There are wallets", async () => {
            jest.spyOn(BaseStorageService.prototype, "get").mockReturnValue(SuccessApiCall({ pin: "1234" }));
            expect(await WalletStorage.getPin()).toEqual("1234");
        });
    });

    describe("setWallets", () => {
        test("There are no wallets", async () => {
            jest.spyOn(BaseStorageService.prototype, "get").mockReturnValue(SuccessApiCall(null));
            const set = jest.spyOn(BaseStorageService.prototype, "set").mockReturnValue(SuccessApiCall(undefined));
            await WalletStorage.setWallets([storageWallet]);
            expect(set).toHaveBeenCalledWith({ wallets: [storageWallet] });
        });

        test("There are wallets", async () => {
            jest.spyOn(BaseStorageService.prototype, "get").mockReturnValue(SuccessApiCall({ pin: "1234", wallets: [storageWallet] }));
            const set = jest.spyOn(BaseStorageService.prototype, "set").mockReturnValue(SuccessApiCall(undefined));
            const newWallet = createStorageWallet({ name: "New wallet", index: 1 });
            await WalletStorage.setWallets([newWallet]);
            expect(set).toHaveBeenCalledWith({ pin: "1234", wallets: [newWallet] });
        });
    });

    describe("addWallet", () => {
        test("There are no wallets", async () => {
            jest.spyOn(BaseStorageService.prototype, "get").mockReturnValue(SuccessApiCall(null));
            const set = jest.spyOn(BaseStorageService.prototype, "set").mockReturnValue(SuccessApiCall(undefined));
            await WalletStorage.addWallet(storageWallet);
            expect(set).toHaveBeenCalledWith({ wallets: [storageWallet] });
        });

        test("There are wallets", async () => {
            jest.spyOn(BaseStorageService.prototype, "get").mockReturnValue(SuccessApiCall({ pin: "1234", wallets: [storageWallet] }));
            const set = jest.spyOn(BaseStorageService.prototype, "set").mockReturnValue(SuccessApiCall(undefined));
            const newWallet = createStorageWallet({ name: "New wallet", index: 1 });
            await WalletStorage.addWallet(newWallet);
            expect(set).toHaveBeenCalledWith({ pin: "1234", wallets: [storageWallet, newWallet] });
        });
    });

    describe("removeWallet", () => {
        test("There are no wallets", async () => {
            jest.spyOn(BaseStorageService.prototype, "get").mockReturnValue(SuccessApiCall(null));
            const set = jest.spyOn(BaseStorageService.prototype, "set").mockReturnValue(SuccessApiCall(undefined));
            await WalletStorage.removeWallet(0);
            expect(set).not.toHaveBeenCalled();
        });

        test("There are wallets", async () => {
            jest.spyOn(BaseStorageService.prototype, "get").mockReturnValue(SuccessApiCall({ pin: "1234", wallets: [storageWallet] }));
            const set = jest.spyOn(BaseStorageService.prototype, "set").mockReturnValue(SuccessApiCall(undefined));
            await WalletStorage.removeWallet(0);
            expect(set).toHaveBeenCalledWith({ pin: "1234", wallets: [] });
        });
    });

    describe("setPin", () => {
        test("There are no wallets", async () => {
            jest.spyOn(BaseStorageService.prototype, "get").mockReturnValue(SuccessApiCall(null));
            const set = jest.spyOn(BaseStorageService.prototype, "set").mockReturnValue(SuccessApiCall(undefined));
            await WalletStorage.setPin("1234");
            expect(set).toHaveBeenCalledWith({ pin: "1234", wallets: [] });
        });

        test("There are wallets", async () => {
            jest.spyOn(BaseStorageService.prototype, "get").mockReturnValue(SuccessApiCall({ pin: "1234", wallets: [storageWallet] }));
            const set = jest.spyOn(BaseStorageService.prototype, "set").mockReturnValue(SuccessApiCall(undefined));
            await WalletStorage.setPin("4321");
            expect(set).toHaveBeenCalledWith({ pin: "4321", wallets: [storageWallet] });
        });
    });
});
