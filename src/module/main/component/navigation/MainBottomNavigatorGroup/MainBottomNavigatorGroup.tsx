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
import { withBasePageContent } from "module/common/component/layout/BasePage/BasePageContent/hoc/withBasePageContent";

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
                <BottomTab.Screen name={MainScreens.HOME} component={withBasePageContent(HomeScreen)} />
                <BottomTab.Screen name={MainScreens.NEWS} component={withBasePageContent(NewsScreen)} />
                <BottomTab.Screen name={MainScreens.STAKING} component={withBasePageContent(StakingScreen)} />
                <BottomTab.Screen options={{ unmountOnBlur: true }} name={MainScreens.DAPPS} component={DAppsNavigator} />
                <BottomTab.Screen name={MainScreens.FAQS} component={withBasePageContent(FaqsScreen)} />
                <BottomTab.Screen name={MainScreens.SETTINGS} component={withBasePageContent(SettingsScreen)} />
            </BottomTab.Navigator>
        </BasePage>
    );
};

export default MainBottomNavigatorGroup;
