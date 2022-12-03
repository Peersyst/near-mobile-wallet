import { ViewStyle, TextStyle, ViewProps } from "react-native";

export type ChipStyle = ViewStyle & TextStyle;

export type ChipVariant = "filled" | "outlined" | "glass";

export type ChipSize = "sm" | "md";

export interface ChipProps extends Omit<ViewProps, "style"> {
    onPress?: () => unknown;
    label: string;
    variant?: ChipVariant;
    fullWidth?: boolean;
    style?: ChipStyle;
    size?: ChipSize;
}

export type ChipRootProps = Pick<ChipProps, "fullWidth" | "variant" | "size">;
export type ChipTextProps = Pick<ChipProps, "variant" | "size">;
