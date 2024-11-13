import MainBottomNavigatorGroup from "module/main/component/navigation/MainBottomNavigatorGroup/MainBottomNavigatorGroup";
import Stack from "stack-navigator";
import { MainScreens } from "module/common/component/navigation/MainNavigatorGroup/MainScreens";
import FiatOrdersNavigationGroup from "module/fiatorders/components/navigation/FiatOrdersNavigatorGroup/FiatOrdersNavigatorGroup";
import { useCapture } from "module/capture/hooks/useCapture";

const MainNavigator = () => {
    useCapture();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={MainScreens.MAIN} component={MainBottomNavigatorGroup} />
            <Stack.Screen
                name={MainScreens.FIAT_ORDERS}
                component={FiatOrdersNavigationGroup}
                options={{ presentation: "modal", animation: "slide_from_bottom" }}
            />
        </Stack.Navigator>
    );
};

export default MainNavigator;
