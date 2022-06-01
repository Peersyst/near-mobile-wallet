import { PaletteMode } from "react-native-components";

export type DirectionType = "horizontal" | "vertical";

export type SizeType = "sm" | "md" | "lg";

export interface AppearanceProps {
    appearance: PaletteMode;
}

export interface DirectionProps {
    direction: DirectionType;
}

export interface SizeProps {
    size: SizeType;
}
