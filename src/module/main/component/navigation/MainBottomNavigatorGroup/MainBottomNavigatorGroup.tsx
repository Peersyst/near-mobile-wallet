import BottomBar from "module/common/component/navigation/BottomBar/BottomBar";
import { BottomTab } from "stack-navigator";
import HomeScreen from "module/home/screen/HomeScreen";
import NewsScreen from "module/news/screen/NewsScreen";
import BasePage from "module/common/component/layout/BasePage/BasePage";
import StakingScreen from "module/staking/screen/StakingScreen";
import DAppsScreen from "module/dapp/screen/DappsScreen/DAppsScreen";

export enum MainBottomScreens {
    HOME = "Home",
    STAKING = "Staking",
    NEWS = "News",
    DAPPS = "DApps",
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
            <BottomTab.Screen name={MainBottomScreens.NEWS} component={NewsScreen} />
            <BottomTab.Screen name={MainBottomScreens.STAKING} component={StakingScreen} />
            <BottomTab.Screen name={MainBottomScreens.DAPPS} component={DAppsScreen} />
        </BottomTab.Navigator>
    </BasePage>
);

export default MainBottomNavigatorGroup;
