import { atom } from "recoil";

export type LangType = "en" | "es";

export type FiatCurrencyType = "btc" | "usd" | "eur";

export type NetworkType = "testnet" | "mainnet";

export type PrefferedFee = "slow" | "average" | "fast";

export interface SettingsState {
    lang: LangType;
    fiat: FiatCurrencyType;
    network: NetworkType;
    fee: PrefferedFee;
}

const settingsState = atom<SettingsState>({
    key: "settings",
    default: { lang: "en", fiat: "usd", network: "mainnet", fee: "average" },
});

export default settingsState;