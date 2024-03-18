import { ReactNode } from "react";
import { StepsProps } from "module/common/component/display/Steps/Steps";
import { ViewStyle } from "react-native";

export interface NavbarProps {
    back?: ReactNode;
    onBack?: () => unknown;
    title?: ReactNode;
    steps?: StepsProps;
    style?: ViewStyle;
}
