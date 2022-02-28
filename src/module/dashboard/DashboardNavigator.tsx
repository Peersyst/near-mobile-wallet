import DashboardScreen from "module/dashboard/DashboardScreen";
import WelcomeBack from "module/main/page/WelcomeBack/WelcomeBack";
import Stack from "stack-navigator";

export enum DashboardScreens {
    WELCOME_BACK = "WelcomeBack",
    HOME = "Home",
}

export const DashboardNavigator = (
    <Stack.Group>
          <Stack.Screen name={DashboardScreens.HOME} component={DashboardScreen} />
        <Stack.Screen name={DashboardScreens.WELCOME_BACK} component={WelcomeBack} />
    </Stack.Group>
);
