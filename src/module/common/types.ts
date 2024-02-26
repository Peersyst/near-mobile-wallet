import { PaletteMode } from "@peersyst/react-native-components";
// <<< refactor remove this types
export type { Network as NetworkType, FiatCurrency as FiatCurrencyType } from "refactor/common/models/settings/Settings";
export { Chains } from "refactor/common/models/settings/Settings";
// refactor remove this types >>>

export type DirectionType = "horizontal" | "vertical";

export type SizeType = "sm" | "md" | "lg";

export type FullNumber = bigint | number | string;

export interface AppearanceProps {
    appearance: PaletteMode;
}

export interface DirectionProps {
    direction: DirectionType;
}

export interface SizeProps {
    size: SizeType;
}
