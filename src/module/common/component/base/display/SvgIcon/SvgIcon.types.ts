import { Color, SvgProps } from "react-native-svg";
import { StyleProp, TextStyle } from "react-native";

export type SvgIconProps = Omit<SvgProps, "width" | "height" | "viewBox" | "xmlns" | "fill" | "stroke" | "style"> & {
    style?: StyleProp<TextStyle & { color?: Color }>;
    size?: string | number;
};
