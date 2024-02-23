import { atom } from "recoil";
import { getDefaultLocale, LocaleType } from "refactor/ui/locale";
import { Chains } from "near-peersyst-sdk";
import { FiatCurrencyType, NetworkType } from "module/common/types";

export interface SettingsState {
    locale?: LocaleType;
    fiat: FiatCurrencyType;
    network: NetworkType;
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
