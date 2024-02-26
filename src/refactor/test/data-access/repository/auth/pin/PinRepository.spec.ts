import PinRepository from "refactor/data-access/repository/auth/pin/PinRepository";
import SecureStorageRepositoryGlobalMock from "../../../mocks/repository/SecureStorageRepository.globalMock";

describe("PinRepository", () => {
    let pinRepository: PinRepository;

    const secureStorageRepositoryMock = new SecureStorageRepositoryGlobalMock();

    beforeEach(() => {
        secureStorageRepositoryMock.clearMocks();
        pinRepository = new PinRepository();
    });

    describe("getPin", () => {
        test("Should call get from secureStorageRepository", async () => {
            const pinMock = "123456";
            secureStorageRepositoryMock.get.mockResolvedValue(pinMock);

            const pin = await pinRepository.getPin();

            expect(pin).toEqual(pinMock);
        });
    });

    describe("setPin", () => {
        test("Should return undefined", async () => {
            const pinMock = "123456";

            await pinRepository.setPin(pinMock);

            expect(secureStorageRepositoryMock.set).toHaveBeenCalledWith(pinMock);
        });
    });

    describe("removePin", () => {
        test("Should call clear from secureStorageRepository", async () => {
            await pinRepository.removePin();

            expect(secureStorageRepositoryMock.clear).toBeCalled();
        });
    });
});
