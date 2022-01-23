import { SvgProps } from "react-native-svg";
import { StyleProp } from "react-native";

export type SvgIconProps = Omit<SvgProps, "width" | "height" | "viewBox" | "xmlns" | "fill" | "stroke" | "style"> & {
    style?: StyleProp<unknown>;
    size?: string | number;
};
