import { FiatCurrency, Locale, Network, Settings } from "refactor/common/models";

export interface ISettingsController {
    getLocale(): Promise<Locale>;
    getFiat(): Promise<FiatCurrency | undefined>;
    getNetwork(): Promise<Network | undefined>;
    getBiometrics(): Promise<boolean | undefined>;
    getAllSettings(): Promise<Settings | undefined>;
    set(values: Partial<Settings>): Promise<void>;
    init(): Promise<Settings>;
    clear(): Promise<void>;
}
