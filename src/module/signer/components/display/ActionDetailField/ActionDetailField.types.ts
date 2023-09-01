import { SvgIconProps } from "@peersyst/react-native-components";
import { ReactChild } from "@peersyst/react-types";
import { JSXElementConstructor } from "react";

export interface ActionDetailFieldProps {
    label: string;
    content: ReactChild;
    LeftIcon?: JSXElementConstructor<SvgIconProps>;
    RightIcon?: JSXElementConstructor<SvgIconProps>;
    description?: string;
}
