import { ReactNode } from "react";
import { StepsProps } from "module/common/component/display/Steps/Steps";
import { ViewStyle } from "react-native";

export type NavbarTitlePosition = "center" | "left";

export interface NavbarProps {
    back?: ReactNode;
    onBack?: () => unknown;
    title?: ReactNode;
    steps?: StepsProps;
    style?: ViewStyle;
    titlePosition?: NavbarTitlePosition;
}

export type NavbarRootProps = Pick<NavbarProps, "titlePosition">;
