import BottomBar from "module/common/component/navigation/BottomBar/BottomBar";
import { BottomTab } from "stack-navigator";
import HomeScreen from "module/home/screen/HomeScreen";
import NewsScreen from "module/news/screen/NewsScreen";
import BasePage from "module/common/component/layout/BasePage/BasePage";
import StakingScreen from "module/staking/screen/StakingScreen";
import DAppsScreen from "module/dapp/screen/DappsScreen/DAppsScreen";
import { MainScreens } from "module/common/component/navigation/MainNavigatorGroup/MainScreens";

export const MainBottomNavigatorGroup = () => (
    <BasePage>
        <BottomTab.Navigator
            initialRouteName={MainScreens.HOME}
            tabBar={(props) => <BottomBar {...props} />}
            screenOptions={{ headerShown: false }}
            sceneContainerStyle={{ backgroundColor: "transparent" }}
            backBehavior="history"
        >
            <BottomTab.Screen name={MainScreens.HOME} component={HomeScreen} />
            <BottomTab.Screen name={MainScreens.NEWS} component={NewsScreen} />
            <BottomTab.Screen name={MainScreens.STAKING} component={StakingScreen} />
            <BottomTab.Screen name={MainScreens.DAPPS} component={DAppsScreen} />
        </BottomTab.Navigator>
    </BasePage>
);

export default MainBottomNavigatorGroup;
