import { FiatCurrencyType, NetworkType } from "module/common/types";
import { ISettingsState } from "refactor/domain/settings/state/settingsState";
import { LocaleType } from "refactor/ui/locale";

export interface ISettingsController {
    getLocale(): Promise<LocaleType | undefined>;
    getFiat(): Promise<FiatCurrencyType | undefined>;
    getNetwork(): Promise<NetworkType | undefined>;
    getBiometrics(): Promise<boolean | undefined>;
    getAllSettings(): Promise<ISettingsState | undefined>;
    set(values: Partial<ISettingsState>): Promise<void>;
    clear(): Promise<void>;
}
