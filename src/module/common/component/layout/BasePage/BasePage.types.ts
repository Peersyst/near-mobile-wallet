import { ReactNode } from "react";
import { ViewStyle } from "react-native";

export interface BasePageProps {
    header?: boolean;
    children?: ReactNode;
    showIcons?: boolean;
    gradient?: boolean;
    style?: ViewStyle;
}

export interface BasePageContentProps {
    header: boolean;
}
