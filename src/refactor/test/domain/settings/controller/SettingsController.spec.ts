import SettingsController from "refactor/domain/settings/controller/SettingsController";
import { ISettingsState } from "refactor/domain/settings/state/settingsState";
import SettingsRepositoryMock from "refactor/test/mocks/settings/SettingsRepository.mock";

describe("SettingsController", () => {
    let settingsController: SettingsController;

    const settingsRepositoryMock = new SettingsRepositoryMock();

    beforeEach(() => {
        settingsRepositoryMock.clearMocks();
        settingsController = new SettingsController(settingsRepositoryMock);
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
            const settings = {
                locale: "en",
                fiat: "usd",
                biometrics: true,
                network: "mainnet",
            };

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
            const settings = {
                locale: "en",
                fiat: "usd",
                biometrics: true,
                network: "mainnet",
            } as ISettingsState;

            await settingsController.set(settings);
            expect(settingsRepositoryMock.set).toBeCalledTimes(1);
            expect(settingsRepositoryMock.set).toBeCalledWith(settings);
        });
    });
});
