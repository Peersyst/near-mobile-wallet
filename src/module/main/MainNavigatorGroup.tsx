import DashboardScreen from "module/main/DashboardScreen";
import Stack from "stack-navigator";
import WelcomeBackPage from "module/auth/page/WelcomeBack/WelcomeBackPage";

export enum DashboardScreens {
    WELCOME_BACK = "WelcomeBack",
    HOME = "Home",
}

export const MainNavigatorGroup = (
    <Stack.Group>
        <Stack.Screen name={DashboardScreens.WELCOME_BACK} component={WelcomeBackPage} />
        <Stack.Screen name={DashboardScreens.HOME} component={DashboardScreen} />
    </Stack.Group>
);
