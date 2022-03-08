import Stack from "stack-navigator";
import { MainBottomTabNavigator } from "./navigation/MainBottomTabNavigatior";

export enum MainScreens {
    MAIN = "Main",
    HOME = "Home",
    DAO = "Dao",
    NEWS = "News",
}

export const MainNavigatorGroup = (
    <Stack.Group>
        <Stack.Screen name={MainScreens.MAIN} component={MainBottomTabNavigator} />
    </Stack.Group>
);
