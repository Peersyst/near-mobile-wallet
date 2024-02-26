export type Locale = "en" | "es" | "fr" | "id" | "it" | "pt" | "ru" | "sw" | "uk" | "vi" | "zh-CN" | "zh-TW";

export type FiatCurrency = "cny" | "usd" | "eur" | "jpy" | "gbp" | "rub" | "uah" | "idr";

export enum Chains {
    MAINNET = "mainnet",
    TESTNET = "testnet",
    BETANET = "betanet",
    LOCAL = "local",
}

export type Network = Chains.TESTNET | Chains.MAINNET;

export interface Settings {
    locale?: Locale;
    fiat?: FiatCurrency;
    network?: Network;
    biometrics?: boolean;
}
