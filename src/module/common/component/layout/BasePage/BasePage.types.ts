import { ReactNode } from "react";
import { ViewStyle } from "react-native";

export interface BasePageProps {
    header?: boolean;
    children?: ReactNode;
    showIcons?: boolean;
    gradient?: boolean;
    style?: ViewStyle;
    watchStatusBar?: boolean;
}

export interface BasePageContentProps {
    header: boolean;
    watchStatusBar: boolean;
}
