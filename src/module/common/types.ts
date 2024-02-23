import { PaletteMode } from "@peersyst/react-native-components";

export type DirectionType = "horizontal" | "vertical";

export type SizeType = "sm" | "md" | "lg";

export type FullNumber = bigint | number | string;

export type FiatCurrencyType = "cny" | "usd" | "eur" | "jpy" | "gbp" | "rub" | "uah" | "idr";

export enum Chains {
    MAINNET = "mainnet",
    TESTNET = "testnet",
    BETANET = "betanet",
    LOCAL = "local",
}

export type NetworkType = Chains.TESTNET | Chains.MAINNET;

export interface AppearanceProps {
    appearance: PaletteMode;
}

export interface DirectionProps {
    direction: DirectionType;
}

export interface SizeProps {
    size: SizeType;
}
