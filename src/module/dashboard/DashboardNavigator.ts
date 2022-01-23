import { NavigatorScreen } from "../../Navigator";
import DashboardScreen from "module/dashboard/DashboardScreen";

export enum DashboardScreens {
    MAIN = "dashboard",
}

export const DashboardNavigator: NavigatorScreen[] = [
    {
        name: DashboardScreens.MAIN,
        component: DashboardScreen,
    },
];
