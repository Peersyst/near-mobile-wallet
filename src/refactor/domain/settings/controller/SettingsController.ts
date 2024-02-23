import { ISettingsController } from "refactor/ui/adapter/controllers/ISettingsController";
import { ISettingsRepository } from "refactor/domain/adapter/repository/ISettingsRepository";
import { LocaleType } from "refactor/ui/locale/i18n.types";
import { ISettingsState } from "../state/settingsState";
import { FiatCurrencyType, NetworkType } from "module/common/types";

export default class SettingsController implements ISettingsController {
    constructor(private readonly settingsRepository: ISettingsRepository) {}

    public async getLocale(): Promise<LocaleType | undefined> {
        return this.settingsRepository.getLocale();
    }

    public async getFiat(): Promise<FiatCurrencyType | undefined> {
        return this.settingsRepository.getFiat();
    }

    public async getNetwork(): Promise<NetworkType | undefined> {
        return this.settingsRepository.getNetwork();
    }

    public async getBiometrics(): Promise<boolean | undefined> {
        return this.settingsRepository.getBiometrics();
    }

    public async getAllSettings(): Promise<ISettingsState | undefined> {
        return this.settingsRepository.getAllSettings();
    }

    public async set(values: Partial<ISettingsState>): Promise<void> {
        this.settingsRepository.set(values);
    }

    public async clear(): Promise<void> {
        this.settingsRepository.clear();
    }
}
