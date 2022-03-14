import BottomBar from "module/common/component/navigation/BottomBar/BottomBar";
import { BottomTab } from "stack-navigator";
import HomeScreen from "module/main/screen/HomeScreen/HomeScreen";
import DaoScreen from "module/dao/page/DaoScreen";
import NewsScreen from "module/news/page/NewsScreen";
import SettingsScreen from "module/settings/screen/SettingsScreen";
import BasePage from "module/common/component/layout/BasePage/BasePage";

export enum MainBottomScreens {
    HOME = "Home",
    DAO = "Dao",
    NEWS = "News",
    SETTINGS = "Settings",
}

const MainBottomNavigatorGroup = () => (
    <BasePage>
        <BottomTab.Navigator
            initialRouteName={MainBottomScreens.HOME}
            tabBar={(props) => <BottomBar {...props} />}
            screenOptions={{ headerShown: false }}
            sceneContainerStyle={{ backgroundColor: "transparent" }}
        >
            <BottomTab.Screen name={MainBottomScreens.HOME} component={HomeScreen} />
            <BottomTab.Screen name={MainBottomScreens.DAO} component={DaoScreen} />
            <BottomTab.Screen name={MainBottomScreens.NEWS} component={NewsScreen} />
            <BottomTab.Screen name={MainBottomScreens.SETTINGS} component={SettingsScreen} />
        </BottomTab.Navigator>
    </BasePage>
);

export default MainBottomNavigatorGroup;
