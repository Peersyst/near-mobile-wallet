import Stack from "stack-navigator";
import WelcomeBackPage from "module/auth/page/WelcomeBackPage/WelcomeBackPage";
import HomePage from "./page/HomePage/HomePage";

export enum MainScreens {
    WELCOME_BACK = "WelcomeBack",
    HOME = "Home",
}

export const MainNavigatorGroup = (
    <Stack.Group>
        <Stack.Screen name={MainScreens.WELCOME_BACK} component={WelcomeBackPage} />
        <Stack.Screen name={MainScreens.HOME} component={HomePage} />
    </Stack.Group>
);
