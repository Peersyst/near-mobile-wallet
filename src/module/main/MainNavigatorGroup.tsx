import Stack from "stack-navigator";
import { MainBottomTabNavigator } from "./navigation/MainBottomTabNavigatior";
import WelcomeBackPage from "module/auth/screen/WelcomeBackPage/WelcomeBackPage";
import ReceiveScreen from "module/wallet/screen/ReceiveScreen";
import SendScreen from "module/wallet/screen/SendScreen";

export enum MainScreens {
    MAIN = "Main",
    WELCOME_BACK = "WelcomeBack",
    HOME = "Home",
    DAO = "Dao",
    NEWS = "News",
    SEND = "Send",
    RECEIVE = "Receive",
}

export const MAIN_SCREEN_PADDING = 15;

export const MainNavigatorGroup = (
    <Stack.Group>
        <Stack.Screen name={MainScreens.MAIN} component={MainBottomTabNavigator} />
        <Stack.Screen name={MainScreens.WELCOME_BACK} component={WelcomeBackPage} />
        <Stack.Screen name={MainScreens.SEND} component={SendScreen} />
        <Stack.Screen name={MainScreens.RECEIVE} component={ReceiveScreen} />
    </Stack.Group>
);
