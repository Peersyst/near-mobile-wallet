import { SvgIconProps } from "./SvgIcon.types";
import Svg, { Color } from "react-native-svg";
import { StyleSheet } from "react-native";

const SvgIcon = ({ style, color: colorProp, size: sizeProp = "24px", ...rest }: SvgIconProps): JSX.Element => {
    let color,
        size = sizeProp;
    if (style) {
        const flattenedStyle = StyleSheet.flatten(style);
        if (flattenedStyle.color) color = flattenedStyle.color;
        if (flattenedStyle.fontSize) size = flattenedStyle.fontSize;
    }

    return (
        <Svg
            viewBox="0 0 24 24"
            /*xmlns="http://www.w3.org/2000/svg"*/ fill={(color as Color) || colorProp}
            width={size}
            height={size}
            accessibilityRole="image"
            {...rest}
        />
    );
};

export default SvgIcon;
