import { ReactElement } from "react";
import { Tab } from "../Tab";
import { ViewStyle } from "react-native";

export interface TabGroupProps {
    /**
     * Render indicator
     */
    renderIndicator?: boolean;
    /**
     * Indicator style
     */
    indicatorStyle?: ViewStyle;
    /**
     * TabGroup style
     */
    style?: ViewStyle;
    /**
     * TabGroup tabs
     */
    children: ReactElement<typeof Tab> | ReactElement<typeof Tab>[];
}
