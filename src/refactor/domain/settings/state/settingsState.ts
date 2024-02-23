import { createStore } from "zustand";
import { getDefaultLocale, LocaleType } from "refactor/ui/locale";
import { Chains, FiatCurrencyType, NetworkType } from "module/common/types";

export interface ISettingsState {
    locale?: LocaleType;
    fiat: FiatCurrencyType;
    network: NetworkType;
    biometrics: boolean;
}

export const defaultSettingsState: ISettingsState = {
    locale: getDefaultLocale(),
    fiat: "usd",
    network: Chains.MAINNET,
    biometrics: true,
};

const settingsState = createStore<ISettingsState>(() => defaultSettingsState);

export default settingsState;
