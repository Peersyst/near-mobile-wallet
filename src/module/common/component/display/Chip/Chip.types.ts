import { ViewStyle, TextStyle } from "react-native";

export type ChipAppearance = "light" | "dark";
export type ChipStyle = ViewStyle & TextStyle;

export interface ChipProps {
    onPress?: () => unknown;
    label: string,
    appearance?: ChipAppearance,
    fullWidth?: boolean,
    style?: ChipStyle;
}

export type ChipTextProps = Required<Pick<ChipProps, "appearance">>;
export type ChipRootProps = Pick<ChipProps,"fullWidth"> & Required<Pick<ChipProps, "appearance">>;