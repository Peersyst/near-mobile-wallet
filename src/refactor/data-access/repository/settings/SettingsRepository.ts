import { ISettingsRepository } from "refactor/domain/adapter/repository/ISettingsRepository";
import { LocaleType } from "refactor/ui/locale";
import { ISettingsState, defaultSettingsState } from "refactor/domain/settings/state/settingsState";
import { FiatCurrencyType, NetworkType } from "module/common/types";
import StorageRepository from "../common/StorageRepository";

export default class SettingRepository extends StorageRepository<ISettingsState> implements ISettingsRepository {
    constructor() {
        super(`settings`);
    }

    public async getLocale(): Promise<LocaleType | undefined> {
        const settings = await this.get();
        return settings?.locale as LocaleType;
    }

    public async getFiat(): Promise<FiatCurrencyType | undefined> {
        const settings = await this.get();
        return settings?.fiat;
    }

    public async getNetwork(): Promise<NetworkType | undefined> {
        const settings = await this.get();
        return settings?.network;
    }

    public async getBiometrics(): Promise<boolean | undefined> {
        const settings = await this.get();
        return settings?.biometrics;
    }

    public async getAllSettings(): Promise<ISettingsState | undefined> {
        return this.get();
    }

    public async set(values: Partial<ISettingsState>): Promise<void> {
        const settings = await this.get();
        await super.set({ ...(settings || defaultSettingsState), ...values });
    }

    public async clear(): Promise<void> {
        return super.clear();
    }
}
