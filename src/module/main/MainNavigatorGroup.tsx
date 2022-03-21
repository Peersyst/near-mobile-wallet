import MainBottomNavigatorGroup from "module/main/component/navigation/MainBottomNavigatorGroup/MainBottomNavigatorGroup";
import ConfirmPinScreen from "module/settings/screen/ConfirmPinScreen";
import Stack from "stack-navigator";

export enum MainScreens {
    MAIN = "Main",
    CONFIRM_PIN = "ConfirmPin",
}

const MainNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={MainScreens.MAIN} component={MainBottomNavigatorGroup} />
            <Stack.Group screenOptions={{ presentation: "modal" }}>
                <Stack.Screen name={MainScreens.CONFIRM_PIN} component={ConfirmPinScreen} options={{ animation: "fade_from_bottom" }} />
            </Stack.Group>
        </Stack.Navigator>
    );
};

export default MainNavigator;
