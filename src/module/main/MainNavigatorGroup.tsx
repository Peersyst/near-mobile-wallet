import DashboardScreen from "module/main/DashboardScreen";
import WelcomeBack from "module/auth/page/WelcomeBack/WelcomeBack";
import Stack from "stack-navigator";

export enum DashboardScreens {
    WELCOME_BACK = "WelcomeBack",
    HOME = "Home",
}

export const MainNavigatorGroup = (
    <Stack.Group>
          <Stack.Screen name={DashboardScreens.HOME} component={DashboardScreen} />
          <Stack.Screen name={DashboardScreens.WELCOME_BACK} component={WelcomeBack} />
    </Stack.Group>
);
