import { Appearance, AppearanceProps } from "module/common/types";
import { ViewStyle, TextStyle } from "react-native";

export type ChipStyle = ViewStyle & TextStyle;

export interface ChipProps {
    onPress?: () => unknown;
    label: string;
    appearance?: Appearance;
    fullWidth?: boolean;
    style?: ChipStyle;
}

export type ChipRootProps = Pick<ChipProps, "fullWidth"> & AppearanceProps;
