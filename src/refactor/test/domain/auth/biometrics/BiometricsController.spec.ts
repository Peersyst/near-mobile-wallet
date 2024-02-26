import BiometricsController from "refactor/domain/auth/biometrics/BiometricsController";
import { BiometricsAuthenticationOptions, BiometricsType } from "refactor/common/models";
import { BiometricsPreferencesRepositoryMock } from "../../mocks/auth/biometrics/BiometricsPreferencesRepository.mock";
import { BiometricsServiceMock } from "../../mocks/auth/biometrics/BiometricsService.mock";

describe("BiometricsController", () => {
    let biometricsController: BiometricsController;

    const biometricsServiceMock = new BiometricsServiceMock();
    const biometricsPreferencesRepositoryMock = new BiometricsPreferencesRepositoryMock();

    beforeEach(() => {
        biometricsServiceMock.clearMocks();
        biometricsPreferencesRepositoryMock.clearMocks();

        biometricsController = new BiometricsController(biometricsServiceMock, biometricsPreferencesRepositoryMock);
    });

    describe("authenticate", () => {
        test("Authenticates", async () => {
            biometricsServiceMock.authenticate.mockResolvedValue(true);

            const optionsMock: BiometricsAuthenticationOptions = { promptMessage: "promptMessage" };

            const res = await biometricsController.authenticate(optionsMock);

            expect(res).toEqual(true);
            expect(biometricsServiceMock.authenticate).toHaveBeenCalledWith({
                disableDeviceFallback: true,
                fallbackLabel: "",
                ...optionsMock,
            });
        });
    });

    describe("isBiometricsAvailable", () => {
        test("Checks if biometrics is available", async () => {
            biometricsServiceMock.isBiometricsAvailable.mockResolvedValue(true);

            const res = await biometricsController.isBiometricsAvailable();

            expect(res).toEqual(true);
        });
    });

    describe("getSupportedBiometric", () => {
        test("Returns the supported biometric", async () => {
            const supportedBiometric = BiometricsType.FINGERPRINT;
            biometricsServiceMock.getSupportedBiometric.mockResolvedValue(supportedBiometric);

            const res = await biometricsController.getSupportedBiometric();

            expect(res).toEqual(supportedBiometric);
        });

        test("Returns undefined", async () => {
            biometricsServiceMock.getSupportedBiometric.mockResolvedValue(undefined);

            const res = await biometricsController.getSupportedBiometric();

            expect(res).toBeUndefined();
        });
    });

    describe("isBiometricsEnabled", () => {
        test("Biometrics are enabled", async () => {
            biometricsPreferencesRepositoryMock.getEnabled.mockResolvedValue(true);

            const res = await biometricsController.isBiometricsEnabled();

            expect(res).toEqual(true);
        });

        test("Biometrics preferences are not set", async () => {
            biometricsPreferencesRepositoryMock.getEnabled.mockResolvedValue(false);

            const res = await biometricsController.isBiometricsEnabled();

            expect(res).toEqual(false);
        });
    });

    describe("setBiometricsEnabled", () => {
        test("Sets biometrics enabled", async () => {
            await biometricsController.setBiometricsEnabled(true);

            expect(biometricsPreferencesRepositoryMock.setEnabled).toHaveBeenCalledWith(true);
        });
    });

    describe("removeBiometricsPreferences", () => {
        test("Removes biometrics preferences", async () => {
            await biometricsController.removeBiometricsPreferences();

            expect(biometricsPreferencesRepositoryMock.removeBiometricsPreferences).toHaveBeenCalled();
        });
    });
});
