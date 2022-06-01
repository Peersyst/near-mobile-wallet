import { cloneElement } from "react";
import { IconProps } from "./Icon.types";
import { StyleSheet } from "react-native";

const Icon = ({ children: child, style: iconStyle }: IconProps): JSX.Element => {
    const { style, ...rest } = child.props;

    return cloneElement(child, {
        ...rest,
        style: { ...StyleSheet.flatten(iconStyle), ...style },
    });
};

export default Icon;
