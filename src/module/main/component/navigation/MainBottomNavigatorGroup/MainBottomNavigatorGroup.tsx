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
import { useBasePagePaddingTop } from "module/common/component/layout/BasePage/hooks/useBasePagePaddingTop";

export const MainBottomNavigatorGroup = () => {
    const { header, onRouteChange } = useMainBottomNavigatorGroupHeader();
    /**
     * Due to a problem with the MainBottomNavigatorGroup a paddingTop is needed to be passed to the main
     * children of the BasePage. This is a workaround to fix the issue with the padding.
     */
    const paddingTop = useBasePagePaddingTop({ header });

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
                sceneContainerStyle={{
                    backgroundColor: "transparent",
                    flex: 1,
                    paddingTop,
                }}
                backBehavior="history"
            >
                <BottomTab.Screen name={MainScreens.HOME} component={HomeScreen} />
                <BottomTab.Screen name={MainScreens.NEWS} component={NewsScreen} />
                <BottomTab.Screen name={MainScreens.STAKING} component={StakingScreen} />
                <BottomTab.Screen options={{ unmountOnBlur: true }} name={MainScreens.DAPPS} component={DAppsNavigator} />
                <BottomTab.Screen name={MainScreens.FAQS} component={FaqsScreen} />
                <BottomTab.Screen name={MainScreens.SETTINGS} component={SettingsScreen} />
            </BottomTab.Navigator>
        </BasePage>
    );
};

export default MainBottomNavigatorGroup;
