import Stack from "stack-navigator";
import { MainBottomTabNavigator } from "./navigation/MainNavigatior";
import WelcomeBackPage from "module/auth/screen/WelcomeBackPage/WelcomeBackPage";
import HomePage from "./screen/HomePage/HomePage";

export enum MainScreens {
    MAIN = "Main",
    WELCOME_BACK = "WelcomeBack",
    HOME = "Home",
    DAO = "Dao",
    NEWS = "News",
}

export const MainNavigatorGroup = (
    <Stack.Group>
        <Stack.Screen name={MainScreens.MAIN} component={MainBottomTabNavigator} />
        <Stack.Screen name={MainScreens.WELCOME_BACK} component={WelcomeBackPage} />
    </Stack.Group>
);
