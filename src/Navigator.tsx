import { JSXElementConstructor } from "react";
import { createNavigation } from "utils/createNavigation";
import { DashboardNavigator, DashboardScreens } from "module/dashboard/DashboardNavigator";

export interface NavigatorScreen {
    name: string;
    component: JSXElementConstructor<unknown>;
}

const navigators: NavigatorScreen[][] = [DashboardNavigator];

const Navigator = (): JSX.Element => createNavigation(navigators, DashboardScreens.MAIN);

export default Navigator;
