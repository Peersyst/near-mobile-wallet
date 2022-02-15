import { StyleProp, ViewStyle, TextStyle } from "react-native";

export type ChipAppearance = "light" | "dark";

export interface ChipProps {
    onPress?: () => unknown;
    label: string,
    appearance?: ChipAppearance,
    fullWidth?: boolean,
    style?: StyleProp<ViewStyle>;
    labelStyle?:StyleProp<TextStyle>
}

export type ChipTextProps = Required<Pick<ChipProps, "appearance">>;
export type ChipRootProps = Pick<ChipProps,"fullWidth"> & Required<Pick<ChipProps, "appearance">>;