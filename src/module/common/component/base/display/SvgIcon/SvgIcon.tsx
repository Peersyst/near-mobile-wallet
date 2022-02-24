import { SvgIconProps } from "./SvgIcon.types";
import Svg, { Color } from "react-native-svg";
import { StyleSheet } from "react-native";
import { useTheme } from "@peersyst/react-native-styled";

const SvgIcon = ({ style, color: colorProp, size: sizeProp = "24px", ...rest }: SvgIconProps): JSX.Element => {
    const {
        palette: { text: textColor },
    } = useTheme();

    let color: Color = textColor,
        size = sizeProp;
    if (style) {
        const flattenedStyle = StyleSheet.flatten(style);
        if (flattenedStyle.color) color = flattenedStyle.color as Color;
        if (flattenedStyle.fontSize) size = flattenedStyle.fontSize;
    }

    return (
        <Svg
            viewBox="0 0 24 24"
            /*xmlns="http://www.w3.org/2000/svg"*/ fill={color || colorProp}
            width={size}
            height={size}
            accessibilityRole="image"
            {...rest}
        />
    );
};

export default SvgIcon;
