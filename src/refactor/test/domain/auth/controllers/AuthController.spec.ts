import AuthController from "refactor/domain/auth/AuthController";
import { AuthStateMock } from "refactor/test/mocks/auth/authState.mock";
import { PinControllerMock } from "refactor/test/mocks/auth/pin/PinController.mock";
import { WalletControllerMock } from "refactor/test/mocks/wallet/wallet/WalletController.mock";

describe("AuthController", () => {
    let authController: AuthController;

    const authStateMock = new AuthStateMock();
    const pinControllerMock = new PinControllerMock();
    const walletControllerMock = new WalletControllerMock();

    beforeEach(() => {
        authController = new AuthController(authStateMock, pinControllerMock, walletControllerMock);

        pinControllerMock.clearMocks();
        walletControllerMock.clearMocks();
        authStateMock.clearMocks();
    });

    describe("signUp", () => {
        test("Should call set mnemonic, pin and change authState", async () => {
            const mnemonic = ["word1", "word2", "word3"];
            const pin = "1234";

            await authController.signUp(mnemonic, pin);

            expect(pinControllerMock.setPin).toHaveBeenCalledWith(pin);
            expect(authStateMock.setState).toHaveBeenCalledWith({ isAuthenticated: true });
        });

        test("Should throw error if mnemonic is invalid", async () => {
            const mnemonic = ["word1", "word2", "word3"];
            const pin = "1234";

            walletControllerMock.createWallets.mockRejectedValue(new Error("Error"));

            await expect(authController.signUp(mnemonic, pin)).rejects.toThrow();
        });
    });

    describe("login", () => {
        test("Should call set pin and set authState", async () => {
            const pin = "1234";

            await authController.login(pin);

            expect(pinControllerMock.checkPin).toHaveBeenCalledWith(pin);
            expect(authStateMock.setState).toHaveBeenCalledWith({ isAuthenticated: true });
        });
        test("Should call set pin invalid", async () => {
            const pin = "1234";

            pinControllerMock.checkPin.mockResolvedValue(false);

            await expect(authController.login(pin)).rejects.toThrow();
        });
    });

    describe("logout", () => {
        test("Should call set pin and set authState in false", async () => {
            await authController.logout();

            expect(authStateMock.setState).toHaveBeenCalledWith({ isAuthenticated: false });
        });
    });
});
