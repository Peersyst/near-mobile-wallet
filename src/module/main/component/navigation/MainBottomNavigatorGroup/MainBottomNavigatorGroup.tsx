import BottomBar from "module/common/component/navigation/BottomBar/BottomBar";
import { BottomTab } from "stack-navigator";
import HomeScreen from "module/home/screen/HomeScreen";
import DAOScreen from "module/dao/screen/DAOScreen";
import NewsScreen from "module/news/screen/NewsScreen";
import SettingsScreen from "module/settings/screen/SettingsScreen";
import BasePage from "module/common/component/layout/BasePage/BasePage";
import GeneralSettingsScreen from "module/settings/screen/GeneralSettingsScreen";
import SecuritySettingsScreen from "module/settings/screen/SecuritySettingsScreen";
import StakingScreen from "module/staking/StakingScreen";

export enum MainBottomScreens {
    HOME = "Home",
    DAO = "DAO",
    STAKING = "Staking",
    NEWS = "News",
    SETTINGS = "Settings",
    GENERAL_SETTINGS = "GeneralSettings",
    SECURITY_SETTINGS = "SecuritySettings",
}

const MainBottomNavigatorGroup = () => (
    <BasePage>
        <BottomTab.Navigator
            initialRouteName={MainBottomScreens.HOME}
            tabBar={(props) => <BottomBar {...props} />}
            screenOptions={{ headerShown: false }}
            sceneContainerStyle={{ backgroundColor: "transparent" }}
            backBehavior="history"
        >
            <BottomTab.Screen name={MainBottomScreens.HOME} component={HomeScreen} />
            <BottomTab.Screen name={MainBottomScreens.DAO} component={DAOScreen} />
            <BottomTab.Screen name={MainBottomScreens.NEWS} component={NewsScreen} />
            <BottomTab.Screen name={MainBottomScreens.SETTINGS} component={SettingsScreen} />
            <BottomTab.Screen name={MainBottomScreens.STAKING} component={StakingScreen} />
            <BottomTab.Screen name={MainBottomScreens.GENERAL_SETTINGS} component={GeneralSettingsScreen} />
            <BottomTab.Screen name={MainBottomScreens.SECURITY_SETTINGS} component={SecuritySettingsScreen} />
        </BottomTab.Navigator>
    </BasePage>
);

export default MainBottomNavigatorGroup;
