import { ReactNode } from "react";
import { ViewStyle } from "react-native";

export interface TabPanelProps {
    /**
     * Tab panel index
     */
    index: number;
    /**
     * Tab panel style
     */
    style?: ViewStyle;
    /**
     * Tab panel content
     */
    children?: ReactNode;
}
