import { ReactNode } from "react";
import { ViewStyle } from "react-native";

export type DividerWidths = "sm" | "md" | "lg" | "full-width";

export interface DividerProps {
    /**
     * Thickness of the divider
     */
    size?: ViewStyle["height"];
    /**
     * Width of the divider
     */
    width?: DividerWidths;
    /**
     * Color of the divider
     */
    color?: string;
    /**
     * Divider style
     */
    style?: ViewStyle;
    /**
     * Content that will go between two dividers
     */
    children?: ReactNode;
}

export interface DividerRootProps {
    height: ViewStyle["height"];
    width: NonNullable<DividerProps["width"]>;
    color?: string;
}

export interface DividerWithChildrenProps {
    width: NonNullable<DividerProps["width"]>;
}
