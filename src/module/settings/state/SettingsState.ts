import { LocaleType } from "locale";
import getDefaultLocale from "locale/utils/getDefaultLocale";
import { atom } from "recoil";

export type FiatCurrencyType = "cny" | "usd" | "eur" | "jpy" | "gbp";

export type NetworkType = "testnet" | "mainnet";

export enum FeeRate {
    SLOW = "SLOW",
    AVERAGE = "AVERAGE",
    FAST = "FAST",
}

export type FeeType = FeeRate.SLOW | FeeRate.AVERAGE | FeeRate.FAST;

export interface SettingsState {
    locale?: LocaleType;
    fiat: FiatCurrencyType;
    network: NetworkType;
    fee: FeeType;
    loading?: boolean;
}

export const defaultSettingsState: SettingsState = { locale: getDefaultLocale(), fiat: "usd", network: "mainnet", fee: FeeRate.AVERAGE };

const settingsState = atom<SettingsState>({
    key: "settings",
    default: defaultSettingsState,
});

export default settingsState;
