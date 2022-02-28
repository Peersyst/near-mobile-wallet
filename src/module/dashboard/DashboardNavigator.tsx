import DashboardScreen from "module/dashboard/DashboardScreen";
import Stack from "stack-navigator";

export enum DashboardScreens {
    HOME = "Home",
}

export const DashboardNavigator = (
    <>
        <Stack.Screen name={DashboardScreens.HOME} component={DashboardScreen} />
    </>
);
