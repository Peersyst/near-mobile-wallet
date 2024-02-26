import SettingsController from "refactor/domain/settings/controller/SettingsController";
import SettingsMock from "refactor/test/mocks/settings/settings.mock";
import LocalizationServiceMock from "../../mocks/settings/localization/LocalizationService.mock";
import { Settings } from "refactor/common/models";
import SettingsRepositoryMock from "../../mocks/settings/repository/SettingsRepository.mock";

describe("SettingsController", () => {
    let settingsController: SettingsController;

    const settingsRepositoryMock = new SettingsRepositoryMock();
    const localizationServiceMock = new LocalizationServiceMock();

    beforeEach(() => {
        settingsRepositoryMock.clearMocks();
        localizationServiceMock.clearMocks();
        settingsController = new SettingsController(settingsRepositoryMock, localizationServiceMock);
    });

    describe("getLocale", () => {
        it("should return the locale", async () => {
            settingsRepositoryMock.getLocale.mockResolvedValue("en");
            const result = await settingsController.getLocale();
            expect(result).toBe("en");
        });
    });

    describe("getFiat", () => {
        it("should return the fiat", async () => {
            settingsRepositoryMock.getFiat.mockResolvedValue("USD");
            const result = await settingsController.getFiat();
            expect(result).toBe("USD");
        });
    });

    describe("getNetwork", () => {
        it("should return the network", async () => {
            settingsRepositoryMock.getNetwork.mockResolvedValue("mainnet");
            const result = await settingsController.getNetwork();
            expect(result).toBe("mainnet");
        });
    });

    describe("getBiometrics", () => {
        it("should return the biometrics", async () => {
            settingsRepositoryMock.getBiometrics.mockResolvedValue(false);
            const result = await settingsController.getBiometrics();
            expect(result).toBe(false);
        });
    });

    describe("getAllSettings", () => {
        it("should return all settings", async () => {
            const settings = new SettingsMock();
            const result = await settingsController.getAllSettings();
            expect(result).toEqual(settings);
        });
    });

    describe("clear", () => {
        it("should clear the settings", async () => {
            await settingsController.clear();
            expect(settingsRepositoryMock.clear).toBeCalledTimes(1);
        });
    });

    describe("set", () => {
        it("should set the settings", async () => {
            const settings: Partial<Settings> = new SettingsMock();

            await settingsController.set(settings);
            expect(settingsRepositoryMock.set).toBeCalledTimes(1);
            expect(settingsRepositoryMock.set).toBeCalledWith(settings);
        });
    });
});
