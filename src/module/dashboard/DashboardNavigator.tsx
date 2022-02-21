import DashboardScreen from "module/dashboard/DashboardScreen";
import { Stack } from "Navigator";

export enum DashboardScreens {
    MAIN = "Main",
}

export const DashboardNavigator = (
    <>
        <Stack.Screen name={DashboardScreens.MAIN} component={DashboardScreen} />
    </>
);
