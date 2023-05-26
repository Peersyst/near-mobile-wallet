import MainBottomNavigatorGroup from "module/main/component/navigation/MainBottomNavigatorGroup/MainBottomNavigatorGroup";
import Stack from "stack-navigator";
import SettingsNavigatorGroup from "module/settings/components/navigation/SettingsNavigatorGroup/SettingsNavigatorGroup";
import { MainScreens } from "module/common/component/navigation/MainNavigatorGroup/MainScreens";
import FiatOrdersNavigationGroup from "module/fiatorders/components/navigation/FiatOrdersNavigatorGroup/FiatOrdersNavigatorGroup";

const MainNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={MainScreens.MAIN} component={MainBottomNavigatorGroup} />
            <Stack.Screen name={MainScreens.SETTINGS} component={SettingsNavigatorGroup} />
            <Stack.Screen name={MainScreens.FIAT_ORDERS} component={FiatOrdersNavigationGroup} />
        </Stack.Navigator>
    );
};

export default MainNavigator;
