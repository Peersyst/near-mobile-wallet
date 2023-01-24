import { atom } from "recoil";
import { getDefaultLocale, LocaleType } from "locale";
import { Chains, FeeRate } from "near-peersyst-sdk";

export type FiatCurrencyType = "cny" | "usd" | "eur" | "jpy" | "gbp";

export type NetworkType = Chains.TESTNET | Chains.MAINNET;

export type FeeType = FeeRate.SLOW | FeeRate.NORMAL | FeeRate.FAST;

export interface SettingsState {
    locale?: LocaleType;
    fiat: FiatCurrencyType;
    network: NetworkType;
    loading?: boolean;
}

export const defaultSettingsState: SettingsState = {
    locale: getDefaultLocale(),
    fiat: "usd",
    network: Chains.TESTNET,
};

const settingsState = atom<SettingsState>({
    key: "settings",
    default: defaultSettingsState,
});

export default settingsState;
