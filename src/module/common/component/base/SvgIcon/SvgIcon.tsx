import { SvgIconProps } from "module/common/component/base/SvgIcon/SvgIcon.types";
import { CSSProperties } from "react";
import Svg from "react-native-svg";

const SvgIcon = ({ style, color: colorProp, size: sizeProp = "24px", ...rest }: SvgIconProps): JSX.Element => {
    let color,
        size = sizeProp;
    if (style) {
        (style as Array<CSSProperties>).forEach((s) => {
            if (s.color) color = s.color;
            if (s.fontSize) size = s.fontSize;
        });
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
