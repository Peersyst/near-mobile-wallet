import BottomBar from "module/common/component/navigation/BottomBar/BottomBar";
import { BottomTab } from "stack-navigator";
import HomePage from "../page/HomePage/HomePage";

export const MainBottomTabNavigator = () => {
    return (
        <BottomTab.Navigator
            initialRouteName="Home"
            tabBar={(props) => <BottomBar {...props} />}
            screenOptions={{ headerShown: false }}
        >
            <BottomTab.Screen name="Home" component={HomePage} />
        </BottomTab.Navigator>
    );
};
