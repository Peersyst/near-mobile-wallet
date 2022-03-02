import { ReactNode } from "react";
import { ViewStyle } from "react-native";

export type TabStyles = ViewStyle & { active?: ViewStyle };

export interface TabProps {
    /**
     * Tab index
     */
    index: number;
    /**
     * Tab style
     */
    style?: TabStyles;
    /**
     * Tab content
     */
    children: ReactNode;
}
