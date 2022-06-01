import { ReactElement } from "react";
import { SvgIconProps } from "../SvgIcon";

export interface IconProps {
    style?: SvgIconProps["style"];
    children: ReactElement;
}
