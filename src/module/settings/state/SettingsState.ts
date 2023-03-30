import { atom } from "recoil";
import { getDefaultLocale, LocaleType } from "locale";
import { Chains } from "near-peersyst-sdk";

export type FiatCurrencyType = "cny" | "usd" | "eur" | "jpy" | "gbp" | "rub" | "uah" | "idr";

export type NetworkType = Chains.TESTNET | Chains.MAINNET;

export interface SettingsState {
    locale?: LocaleType;
    fiat: FiatCurrencyType;
    network: NetworkType;
    loading?: boolean;
    biometrics: boolean;
    forcedMainnet?: boolean;
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
