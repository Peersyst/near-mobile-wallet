import { atom } from "recoil";
import { Chains, FiatCurrency, Locale, Network } from "refactor/common/models";
import { getDefaultLocale } from "refactor/ui/locale";

export interface SettingsState {
    locale?: Locale;
    fiat: FiatCurrency;
    network: Network;
    biometrics: boolean;
}

export const defaultSettingsState: SettingsState = {
    locale: getDefaultLocale(),
    fiat: "usd",
    network: Chains.MAINNET,
    biometrics: true,
};

const settingsState = atom<SettingsState>({
    key: "settings",
    default: defaultSettingsState,
});

export default settingsState;
