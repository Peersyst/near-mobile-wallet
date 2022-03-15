import { ViewStyle, TextStyle } from "react-native";
import { ReactNode } from "react";

export interface SelectItemProps {
    /**
     * Item value
     */
    value: unknown;
    /**
     * Item style
     */
    style?: SelectItemStyles;
    /**
     * Item content
     */
    children: ReactNode;
}

export type SelectItemStyles = ViewStyle &
    TextStyle & {
        selected?: ViewStyle & TextStyle;
        readonly?: ViewStyle & TextStyle;
    };
