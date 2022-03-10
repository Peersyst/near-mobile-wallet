import BottomBar from "module/common/component/navigation/BottomBar/BottomBar";
import DaoScreen from "module/dao/page/DaoScreen";
import NewsScreen from "module/news/page/NewsScreen";
import { BottomTab } from "stack-navigator";
import BasePage from "module/common/component/layout/BasePage/BasePage";
import HomeScreen from "./screen/HomeScreen/HomeScreen";
import SettingsScreen from "module/settings/screen/SettingsScreen";

export enum MainScreens {
    HOME = "Home",
    DAO = "Dao",
    NEWS = "News",
    SETTINGS = "Settings",
}

const MainNavigator = () => {
    return (
        <BasePage>
            <BottomTab.Navigator
                initialRouteName={MainScreens.HOME}
                tabBar={(props) => <BottomBar {...props} />}
                screenOptions={{ headerShown: false }}
                sceneContainerStyle={{ backgroundColor: "transparent" }}
            >
                <BottomTab.Screen name={MainScreens.HOME} component={HomeScreen} />
                <BottomTab.Screen name={MainScreens.DAO} component={DaoScreen} />
                <BottomTab.Screen name={MainScreens.NEWS} component={NewsScreen} />
                <BottomTab.Screen name={MainScreens.SETTINGS} component={SettingsScreen} />
            </BottomTab.Navigator>
        </BasePage>
    );
};

export default MainNavigator;
