import { ReactElement } from "react";

export type MainTabItemType = {
    title: string;
    item: ReactElement;
};

export interface MainTabsType {
    tabs: MainTabItemType[];
    backgroundColor?: boolean;
}
