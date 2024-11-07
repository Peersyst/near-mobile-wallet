import BottomBar from "module/common/component/navigation/BottomBar/BottomBar";
import { BottomTab } from "stack-navigator";
import HomeScreen from "module/home/screen/HomeScreen";
import NewsScreen from "module/news/screen/NewsScreen";
import BasePage from "module/common/component/layout/BasePage/BasePage";
import StakingScreen from "module/staking/screen/StakingScreen";
import { MainScreens } from "module/common/component/navigation/MainNavigatorGroup/MainScreens";
import FaqsScreen from "module/faqs/screen/FaqsScreen";
import SettingsScreen from "module/settings/screen/SettingsScreen/SettingsScreen";
import DAppsNavigator from "module/dapp/navigator/DAppsNavigator";
import useMainBottomNavigatorGroupHeader from "./hooks/useMainBottomNavigatorGroupHeader";
import { withBaseBottomBarScreen } from "module/common/component/layout/BaseBottomBarScreen/hoc/withBaseBottomBarScreen";

export const MainBottomNavigatorGroup = () => {
    const { header, onRouteChange } = useMainBottomNavigatorGroupHeader();

    return (
        <BasePage header={header}>
            <BottomTab.Navigator
                screenListeners={({ route }) => ({
                    state: () => {
                        onRouteChange(route);
                    },
                })}
                initialRouteName={MainScreens.HOME}
                tabBar={(props) => <BottomBar {...props} />}
                screenOptions={{ headerShown: false }}
                sceneContainerStyle={{ backgroundColor: "transparent", flex: 1 }}
                backBehavior="history"
            >
                <BottomTab.Screen name={MainScreens.HOME} component={withBaseBottomBarScreen(HomeScreen)} />
                <BottomTab.Screen name={MainScreens.NEWS} component={withBaseBottomBarScreen(NewsScreen)} />
                <BottomTab.Screen name={MainScreens.STAKING} component={withBaseBottomBarScreen(StakingScreen)} />
                <BottomTab.Screen
                    options={{ unmountOnBlur: true }}
                    name={MainScreens.DAPPS}
                    component={withBaseBottomBarScreen(DAppsNavigator)}
                />
                <BottomTab.Screen name={MainScreens.FAQS} component={withBaseBottomBarScreen(FaqsScreen)} />
                <BottomTab.Screen name={MainScreens.SETTINGS} component={withBaseBottomBarScreen(SettingsScreen)} />
            </BottomTab.Navigator>
        </BasePage>
    );
};

export default MainBottomNavigatorGroup;
