import { StyleProp, ViewStyle, TextStyle } from "react-native";

export type ChipVariant = "light" | "dark";

export interface ChipProps {
    onPress?: () => unknown;
    label: string,
    variant?: ChipVariant,
    fullWidth?: boolean,
    style?: StyleProp<ViewStyle>;
    labelStyle?:StyleProp<TextStyle>
}

export type ChipTextProps = Pick<ChipProps, "variant">;
export type ChipRootProps = Pick<ChipProps, "variant" | "fullWidth">;