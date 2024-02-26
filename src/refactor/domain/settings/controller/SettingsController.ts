import { ISettingsController } from "refactor/ui/adapter/controllers/ISettingsController";
import { ISettingsRepository } from "refactor/domain/adapter/repository/ISettingsRepository";
import { Chains, FiatCurrency, Locale, Network, Settings } from "refactor/common/models";
import { ILocalizationService } from "refactor/domain/adapter/service/ILocalizationService";
import { SUPPORTED_LOCALES } from "refactor/common/utils/constants";

export default class SettingsController implements ISettingsController {
    constructor(
        private readonly settingsRepository: ISettingsRepository,
        private readonly localizationService: ILocalizationService,
    ) {}

    //TODO: add `onInit` method
    async onInit(): Promise<void> {
        await this.init();
    }

    public async getLocale(): Promise<Locale> {
        let locale: string | undefined = await this.settingsRepository.getLocale();
        if (!locale) locale = this.localizationService.getLocale();

        const systemLocaleEnd = locale.slice(-2).toLowerCase();
        const systemLocaleStart = locale.slice(0, 2).toLowerCase();
        return SUPPORTED_LOCALES.find((l) => systemLocaleStart === l || systemLocaleEnd === l) ?? "en";
    }

    public async getFiat(): Promise<FiatCurrency | undefined> {
        return this.settingsRepository.getFiat();
    }

    public async getNetwork(): Promise<Network | undefined> {
        return this.settingsRepository.getNetwork();
    }

    public async getBiometrics(): Promise<boolean | undefined> {
        return this.settingsRepository.getBiometrics();
    }

    public async getAllSettings(): Promise<Settings | undefined> {
        return this.settingsRepository.getAllSettings();
    }

    public async set(values: Partial<Settings>): Promise<void> {
        this.settingsRepository.set(values);
    }

    private async getDefaultSettings(): Promise<Settings> {
        return { locale: await this.getLocale(), fiat: "usd", network: Chains.MAINNET, biometrics: true };
    }

    public async init(): Promise<Settings> {
        const defaultSettings: Settings = await this.getDefaultSettings();
        await this.set(defaultSettings);
        return defaultSettings;
    }

    public async clear(): Promise<void> {
        this.settingsRepository.clear();
    }
}
