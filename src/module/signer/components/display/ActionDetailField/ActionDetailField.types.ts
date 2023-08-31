import { SvgIconProps } from "@peersyst/react-native-components";
import { ReactChild } from "@peersyst/react-types";
import { JSXElementConstructor } from "react";

export interface ActionDetailFieldProps {
    label: string;
    content?: ReactChild;
    leftIcon?: JSXElementConstructor<SvgIconProps>;
    rightIcon?: JSXElementConstructor<SvgIconProps>;
    description?: string;
}
