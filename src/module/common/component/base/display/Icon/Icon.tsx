import { cloneElement } from "react";
import { IconProps } from "module/common/component/base/display/Icon/Icon.types";
import { StyleSheet } from "react-native";

export const Icon = ({ children: child, style: iconStyle }: IconProps): JSX.Element => {
    const { style, ...rest } = child.props;

    return cloneElement(child, {
        ...rest,
        style: { ...StyleSheet.flatten(iconStyle), ...style },
    });
};

export default Icon;
