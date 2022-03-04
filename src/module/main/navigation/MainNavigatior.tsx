import BottomBar from "module/common/component/navigation/BottomBar/BottomBar";
import DaoScreen from "module/dao/page/DaoScreen";
import NewsScreen from "module/news/page/NewsScreen";
import { BottomTab } from "stack-navigator";
import { MainScreens } from "../MainNavigatorGroup";
import HomePage from "../screen/HomePage/HomePage";

export const MainBottomTabNavigator = () => {
    return (
        <BottomTab.Navigator initialRouteName="Home" tabBar={(props) => <BottomBar {...props} />} screenOptions={{ headerShown: false }}>
            <BottomTab.Screen name={MainScreens.HOME} component={HomePage} />
            <BottomTab.Screen name={MainScreens.DAO} component={DaoScreen} />
            <BottomTab.Screen name={MainScreens.NEWS} component={NewsScreen} />
        </BottomTab.Navigator>
    );
};
