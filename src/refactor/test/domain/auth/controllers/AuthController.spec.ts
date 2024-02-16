import AuthController from "refactor/domain/auth/controller/AuthController";
import { AuthStateMock } from "refactor/test/mocks/auth/authState.mock";
import { MnemonicControllerMock } from "refactor/test/mocks/auth/mnemonic/MnemonicController.mock";
import { PinControllerMock } from "refactor/test/mocks/auth/pin/PinController.mock";

describe("AuthController", () => {
    let authController: AuthController;

    const authStateMock = new AuthStateMock();
    const pinControllerMock = new PinControllerMock();
    const mnemonicControllerMock = new MnemonicControllerMock();

    beforeEach(() => {
        authController = new AuthController(authStateMock, pinControllerMock, mnemonicControllerMock);

        pinControllerMock.clearMocks();
        mnemonicControllerMock.clearMocks();
        authStateMock.clearMocks();
    });

    describe("signUp", () => {
        test("Should call set mnemonic, pin and change authState", async () => {
            const mnemonic = ["word1", "word2", "word3"];
            const pin = "1234";

            await authController.signUp(mnemonic, pin);

            expect(mnemonicControllerMock.setMnemonic).toHaveBeenCalledWith(mnemonic.join(" "));
            expect(pinControllerMock.setPin).toHaveBeenCalledWith(pin);
            expect(authStateMock.setState).toHaveBeenCalledWith({ isAuthenticated: true });
        });
    });

    describe("login", () => {
        test("Should call set pin and set authState", async () => {
            const pin = "1234";

            await authController.login(pin);

            expect(pinControllerMock.checkPin).toHaveBeenCalledWith(pin);
            expect(authStateMock.setState).toHaveBeenCalledWith({ isAuthenticated: true });
        });
    });

    describe("logout", () => {
        test("Should call set pin and set authState in false", async () => {
            await authController.logout();

            expect(authStateMock.setState).toHaveBeenCalledWith({ isAuthenticated: false });
        });
    });
});
