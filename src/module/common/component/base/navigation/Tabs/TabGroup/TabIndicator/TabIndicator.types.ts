import { LayoutRectangle, ViewStyle } from "react-native";

export interface TabIndicatorProps {
    style?: ViewStyle;
    tabGroupLayout: LayoutRectangle | undefined;
}

export interface TabIndicatorStyles {
    width: number;
    position: number;
}
