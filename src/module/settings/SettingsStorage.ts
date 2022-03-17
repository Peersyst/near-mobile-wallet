import { LocaleType } from "locale";
import { BaseStorageService } from "module/common/service/BaseStorageService";
import { FeeType, FiatCurrencyType, NetworkType, SettingsState } from "./state/SettingsState";

export const SettingsStorage = new (class extends BaseStorageService<SettingsState> {
    constructor() {
        super("settings");
    }

    async getLocale(): Promise<LocaleType | undefined> {
        const settings = await this.get();
        return settings?.locale;
    }

    async getFiat(): Promise<FiatCurrencyType | undefined> {
        const settings = await this.get();
        return settings?.fiat;
    }

    async getNetwork(): Promise<NetworkType | undefined> {
        const settings = await this.get();
        return settings?.network;
    }

    async getFee(): Promise<FeeType | undefined> {
        const settings = await this.get();
        return settings?.fee;
    }

    async getAllSettings(): Promise<SettingsState | null> {
        return await this.get();;
    }
    
})();
