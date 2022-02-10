import { StyleProp, ViewStyle } from "react-native";

export type ChipVariant = "light" | "dark";

export interface ChipProps {
    onPress?: () => unknown;
    label: string,
    variant?: ChipVariant,
    fullWidth?: boolean,
    style?: StyleProp<ViewStyle>;
}

export type ChipStylesProps = Pick<ChipProps, "variant">;
