import { LocaleType } from "refactor/ui/locale";
import { BaseStorageService } from "module/common/service/BaseStorageService";
import { defaultSettingsState, FiatCurrencyType, NetworkType, SettingsState } from "./state/SettingsState";

export const SettingsStorage = new (class extends BaseStorageService<undefined, SettingsState> {
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

    async getBiometrics(): Promise<boolean | undefined> {
        const settings = await this.get();
        return settings?.biometrics;
    }

    async getAllSettings(): Promise<SettingsState | null> {
        return await this.get();
    }

    async set(values: Partial<SettingsState>): Promise<void> {
        const storedValues = await this.get();
        await super.set({ ...(storedValues || defaultSettingsState), ...values });
    }
})();
