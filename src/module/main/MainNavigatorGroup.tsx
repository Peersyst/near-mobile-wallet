import DashboardScreen from "module/main/DashboardScreen";
import Stack from "stack-navigator";
import WelcomeBackPage from "module/auth/page/WelcomeBackPage/WelcomeBackPage";

export enum MainScreens {
    WELCOME_BACK = "WelcomeBack",
    HOME = "Home",
}

export const MainNavigatorGroup = (
    <Stack.Group>
        <Stack.Screen name={MainScreens.WELCOME_BACK} component={WelcomeBackPage} />
        <Stack.Screen name={MainScreens.HOME} component={DashboardScreen} />
    </Stack.Group>
);
