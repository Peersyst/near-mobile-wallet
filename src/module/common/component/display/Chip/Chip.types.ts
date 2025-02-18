import { ViewStyle, TextStyle } from "react-native";

export type ChipStyle = ViewStyle & TextStyle;

export type ChipVariant = "filled" | "outlined" | "glass" | "gradient";

export type ChipSize = "xs" | "sm" | "md";

export interface ChipProps {
    onPress?: () => unknown;
    label: string;
    variant?: ChipVariant;
    fullWidth?: boolean;
    style?: ChipStyle;
    size?: ChipSize;
}

export type ChipRootProps = Pick<ChipProps, "fullWidth" | "variant" | "size">;
export type ChipTextProps = Pick<ChipProps, "variant" | "size">;
