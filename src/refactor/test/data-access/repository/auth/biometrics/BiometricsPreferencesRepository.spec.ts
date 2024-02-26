import BiometricsPreferencesRepository from "refactor/data-access/repository/auth/biometrics/BiometricsPreferencesRepository";
import StorageRepositoryGlobalMock from "../../../mocks/repository/StorageRepository.globalMock";
import { BiometricsPreferencesMock } from "refactor/test/mocks/auth/biometrics/BiometricsPreferences.mock";

describe("BiometricsPreferencesRepository", () => {
    let biometricsPreferencesRepository: BiometricsPreferencesRepository;

    const storageRepositoryMock = new StorageRepositoryGlobalMock();

    beforeEach(() => {
        storageRepositoryMock.clearMocks();

        biometricsPreferencesRepository = new BiometricsPreferencesRepository();
    });

    describe("getBiometricPreferences", () => {
        test("Should call get from secureStorageRepository", async () => {
            const biometricsPreferencesMock = new BiometricsPreferencesMock();
            storageRepositoryMock.get.mockResolvedValue(biometricsPreferencesMock);

            const preferences = await biometricsPreferencesRepository.getBiometricsPreferences();

            expect(preferences).toEqual(biometricsPreferencesMock);
        });
    });

    describe("setBiometricPreferences", () => {
        test("Should return undefined", async () => {
            const biometricsPreferencesMock = new BiometricsPreferencesMock();

            await biometricsPreferencesRepository.setBiometricsPreferences(biometricsPreferencesMock);

            expect(storageRepositoryMock.set).toHaveBeenCalledWith(biometricsPreferencesMock);
        });
    });

    describe("getEnabled", () => {
        test("Should return enabled", async () => {
            const biometricsPreferencesMock = new BiometricsPreferencesMock({ enabled: true });
            storageRepositoryMock.get.mockResolvedValue(biometricsPreferencesMock);

            const enabled = await biometricsPreferencesRepository.getEnabled();

            expect(enabled).toEqual(biometricsPreferencesMock.enabled);
        });
    });

    describe("setEnabled", () => {
        test("Should set enabled to true", async () => {
            const biometricsPreferencesMock = new BiometricsPreferencesMock({ enabled: false });
            storageRepositoryMock.get.mockResolvedValue(biometricsPreferencesMock);

            await biometricsPreferencesRepository.setEnabled(true);

            expect(storageRepositoryMock.set).toHaveBeenCalledWith({ ...biometricsPreferencesMock, enabled: true });
        });
    });

    describe("removeBiometricPreferences", () => {
        test("Should call clear from secureStorageRepository", async () => {
            await biometricsPreferencesRepository.removeBiometricsPreferences();

            expect(storageRepositoryMock.clear).toBeCalled();
        });
    });
});
