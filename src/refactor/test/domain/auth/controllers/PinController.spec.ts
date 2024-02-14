import AuthErrorCodes from "refactor/domain/auth/AuthErrorCodes";
import PinController from "refactor/domain/auth/controller/PinController";
import DomainError from "refactor/domain/error/DomainError";
import PinRepositoryMock from "refactor/test/mocks/auth/pin/PinRepository.mock";

describe("PinController", () => {
    let pinController: PinController;

    const pinRepositoryMock = new PinRepositoryMock();

    beforeEach(() => {
        pinRepositoryMock.clearMocks();
        pinController = new PinController(pinRepositoryMock);
    });

    describe("setPin", () => {
        test("Stores pin", async () => {
            const pinMock = "123456";

            await pinController.setPin(pinMock);

            expect(pinRepositoryMock.setPin).toHaveBeenCalledWith(pinMock);
        });
    });

    describe("checkPin", () => {
        test("Pin is correct", async () => {
            const pinMock = "123456";
            pinRepositoryMock.getPin.mockResolvedValue(pinMock);

            const result = await pinController.checkPin(pinMock);

            expect(result).toEqual(true);
        });

        test("Pin is incorrect", async () => {
            const pinMock = "123456";
            pinRepositoryMock.getPin.mockResolvedValue(pinMock);

            const result = await pinController.checkPin("654321");

            expect(result).toEqual(false);
        });

        test("Throws PIN_IS_NOT_SET error", async () => {
            pinRepositoryMock.getPin.mockResolvedValue(undefined);

            await expect(pinController.checkPin("123456")).rejects.toThrowError(new DomainError(AuthErrorCodes.PIN_IS_NOT_SET));
        });
    });

    describe("isPinSet", () => {
        test("Pin is set", async () => {
            pinRepositoryMock.getPin.mockResolvedValue("123456");

            const result = await pinController.isPinSet();

            expect(result).toEqual(true);
        });

        test("Pin is not set", async () => {
            pinRepositoryMock.getPin.mockResolvedValue(undefined);

            const result = await pinController.isPinSet();

            expect(result).toEqual(false);
        });
    });

    describe("removePin", () => {
        test("Removes pin", async () => {
            jest.spyOn(pinController, "isPinSet").mockResolvedValueOnce(true);

            await pinController.removePin();

            expect(pinRepositoryMock.removePin).toHaveBeenCalled();
        });
    });
});
