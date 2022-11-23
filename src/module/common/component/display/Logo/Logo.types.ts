import { SvgProps } from "react-native-svg";
import { StyleProp, TextStyle } from "react-native";

export type LogoProps = Omit<SvgProps, "width" | "height" | "viewBox" | "xmlns" | "fill" | "stroke" | "style"> & {
    style?: StyleProp<TextStyle>;
};
