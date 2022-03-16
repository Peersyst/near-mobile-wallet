import getDefaultLocale, { LocaleType } from "locale/utils/getDefaultLocale";
import { atom } from "recoil";

export type FiatCurrencyType = "btc" | "usd" | "eur";

export type NetworkType = "testnet" | "mainnet";

export type FeeType = "slow" | "average" | "fast";

export interface SettingsState {
    locale?: LocaleType;
    fiat: FiatCurrencyType;
    network: NetworkType;
    fee: FeeType;
}

export const defaultSettingsState: SettingsState = { locale: getDefaultLocale(), fiat: "usd", network: "mainnet", fee: "average" };

const settingsState = atom<SettingsState>({
    key: "settings",
    default: defaultSettingsState,
});

export default settingsState;
