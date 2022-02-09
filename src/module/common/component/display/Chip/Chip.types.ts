import {StyleProp, ViewStyle} from "react-native";

export type ChipVariant = "light" | "dark";

export interface ChipProps {
    label: string,
    variant?: ChipVariant,
    fullWidth?: boolean,
    style?: StyleProp<ViewStyle>;
}

export type ChipRootProps = Omit<ChipProps, "label">
