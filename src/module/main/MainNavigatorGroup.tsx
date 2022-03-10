import Stack from "stack-navigator";
import { MainBottomTabNavigator } from "./navigation/MainBottomTabNavigatior";
import WelcomeBackPage from "module/auth/screen/WelcomeBackPage/WelcomeBackPage";

export enum MainScreens {
    MAIN = "Main",
    WELCOME_BACK = "WelcomeBack",
    HOME = "Home",
    DAO = "Dao",
    NEWS = "News",
}

export const MAIN_SCREEN_PADDING = 15;

export const MainNavigatorGroup = (
    <Stack.Group>
        <Stack.Screen name={MainScreens.MAIN} component={MainBottomTabNavigator} />
        <Stack.Screen name={MainScreens.WELCOME_BACK} component={WelcomeBackPage} />
    </Stack.Group>
);
