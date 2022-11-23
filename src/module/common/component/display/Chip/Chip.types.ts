import { ViewStyle, TextStyle } from "react-native";

export type ChipStyle = ViewStyle & TextStyle;

export type ChipVariant = "filled" | "outlined";

export interface ChipProps {
    onPress?: () => unknown;
    label: string;
    variant?: ChipVariant;
    fullWidth?: boolean;
    style?: ChipStyle;
}

export type ChipRootProps = Pick<ChipProps, "fullWidth" | "variant">;
export type ChipTextProps = Pick<ChipProps, "variant">;
