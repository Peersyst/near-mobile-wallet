import { FiatCurrency, Locale, Network, Settings } from "refactor/common/models";

export interface ISettingsRepository {
    getLocale(): Promise<Locale | undefined>;
    getFiat(): Promise<FiatCurrency | undefined>;
    getNetwork(): Promise<Network | undefined>;
    getBiometrics(): Promise<boolean | undefined>;
    getAllSettings(): Promise<Settings | undefined>;
    set(values: Partial<Settings>): Promise<void>;
    clear(): Promise<void>;
}
