import { ISettingsRepository } from "refactor/domain/adapter/repository/ISettingsRepository";
import StorageRepository from "../common/StorageRepository";
import { config } from "refactor/common/config";
import { FiatCurrency, Locale, Network, Settings } from "refactor/common/models";

export default class SettingsRepository extends StorageRepository<Settings> implements ISettingsRepository {
    constructor() {
        //<<< refactor @needsmigration
        super(`${config.projectName}-settings`);
        // refactor >>>
    }

    public async getLocale(): Promise<Locale | undefined> {
        const settings = await this.get();
        return settings?.locale;
    }

    public async getFiat(): Promise<FiatCurrency | undefined> {
        const settings = await this.get();
        return settings?.fiat;
    }

    public async getNetwork(): Promise<Network | undefined> {
        const settings = await this.get();
        return settings?.network;
    }

    public async getBiometrics(): Promise<boolean | undefined> {
        const settings = await this.get();
        return settings?.biometrics;
    }

    public async getAllSettings(): Promise<Settings | undefined> {
        return this.get();
    }

    public async set(newSettings: Partial<Settings>): Promise<void> {
        const settings = await this.get();
        await super.set({ ...settings, ...newSettings });
    }

    public async clear(): Promise<void> {
        return super.clear();
    }
}
