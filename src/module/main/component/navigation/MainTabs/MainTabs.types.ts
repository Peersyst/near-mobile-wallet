import { TabGroupProps, TabPanelProps, TabsProps } from "@peersyst/react-native-components";
import { ReactElement } from "react";

export type MainTabItemType = {
    title: string;
    item: ReactElement;
};

export type MainTabsStyle = TabsProps["style"] & {
    tabGroup?: TabGroupProps["style"];
    tabPanel?: TabPanelProps["style"];
};

export interface MainTabsProps {
    tabs: MainTabItemType[];
    backgroundColor?: boolean;
    style?: MainTabsStyle;
}
