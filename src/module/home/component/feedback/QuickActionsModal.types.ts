import { SvgIconProps } from "@peersyst/react-native-components";
import { JSXElementConstructor } from "react";

export interface QuickAction {
    label: string;
    Icon: JSXElementConstructor<SvgIconProps>;
    onPress: () => void;
    variant: "primary" | "soft";
}
