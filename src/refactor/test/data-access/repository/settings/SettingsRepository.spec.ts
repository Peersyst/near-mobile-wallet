import SettingRepository from "refactor/data-access/repository/settings/SettingsRepository";
import StorageRepositoryGlobalMock from "../../mocks/repository/StorageRepository.globalMock";
import SettingsMock from "refactor/test/mocks/settings/settings.mock";
import { Chains } from "refactor/common/models";

describe("MnemonicRepository", () => {
    const storageRepositoryGlobalMock = new StorageRepositoryGlobalMock();
    let settingsRepository: SettingRepository;

    beforeEach(() => {
        storageRepositoryGlobalMock.clearMocks();
        settingsRepository = new SettingRepository();
    });

    describe("Getters", () => {
        test("Should return locale", async () => {
            const settings = new SettingsMock({ locale: "en" });
            storageRepositoryGlobalMock.get.mockResolvedValueOnce(settings);
            const result = await settingsRepository.getLocale();
            expect(result).toEqual("en");
        });
        test("Should return fiat", async () => {
            const settings = new SettingsMock({ fiat: "usd" });
            storageRepositoryGlobalMock.get.mockResolvedValueOnce(settings);
            const result = await settingsRepository.getFiat();
            expect(result).toEqual("usd");
        });
        test("Should return network", async () => {
            const settings = new SettingsMock({ network: Chains.MAINNET });
            storageRepositoryGlobalMock.get.mockResolvedValueOnce(settings);
            const result = await settingsRepository.getNetwork();
            expect(result).toEqual(Chains.MAINNET);
        });
        test("Should return biometrics", async () => {
            const settings = new SettingsMock({ biometrics: true });
            storageRepositoryGlobalMock.get.mockResolvedValueOnce(settings);
            const result = await settingsRepository.getBiometrics();
            expect(result).toEqual(true);
        });
        test("Should return all settings", async () => {
            const settings = new SettingsMock({ locale: "en", fiat: "usd" });
            storageRepositoryGlobalMock.get.mockResolvedValueOnce(settings);
            const result = await settingsRepository.getAllSettings();
            expect(result).toEqual(settings);
        });
    });

    describe("Setters", () => {
        test("Should set new settings", async () => {
            const oldSettings = new SettingsMock({ locale: "es", fiat: "usd" });
            const newSettings = new SettingsMock({ locale: "en" });
            storageRepositoryGlobalMock.get.mockResolvedValueOnce(oldSettings);
            await settingsRepository.set(newSettings);
            expect(storageRepositoryGlobalMock.set).toHaveBeenCalledWith({ ...oldSettings, ...newSettings });
        });
    });

    describe("clear", () => {
        test("Should clear settings", async () => {
            await settingsRepository.clear();
            expect(storageRepositoryGlobalMock.clear).toHaveBeenCalled();
        });
    });
});
