import { AppearanceProps } from "module/common/types";
import { PaletteMode } from "react-native-components";
import { ViewStyle, TextStyle } from "react-native";

export type ChipStyle = ViewStyle & TextStyle;

export interface ChipProps {
    onPress?: () => unknown;
    label: string;
    appearance?: PaletteMode;
    fullWidth?: boolean;
    style?: ChipStyle;
}

export type ChipRootProps = Pick<ChipProps, "fullWidth"> & AppearanceProps;
