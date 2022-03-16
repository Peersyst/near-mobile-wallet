import { BaseStorageService } from "module/common/service/BaseStorageService";
import { SettingsState } from "./state/SettingsState";

export const SettingsStorage = new (class extends BaseStorageService<SettingsState> {
    constructor() {
        super("settings");
    }

    async getLocale(): Promise<string | undefined> {
        const settings = await this.get();
        return settings?.locale;
    }

    async getFiat(): Promise<string | undefined> {
        const settings = await this.get();
        return settings?.fiat;
    }

    async getNetwork(): Promise<string | undefined> {
        const settings = await this.get();
        return settings?.network;
    }

    async getFee(): Promise<string | undefined> {
        const settings = await this.get();
        return settings?.fee;
    }

    async getAllSettings(): Promise<Partial<SettingsState> | undefined> {
        const settings = await this.get();
        return { locale: settings?.locale, fiat: settings?.fiat, network: settings?.network, fee: settings?.fee };
    }

})();
