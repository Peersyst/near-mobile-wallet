import MainBottomNavigatorGroup from "module/main/component/navigation/MainBottomNavigatorGroup/MainBottomNavigatorGroup";
import ConfirmPinScreen from "module/settings/screen/ConfirmPinScreen";
import UpdatePinScreen from "module/settings/screen/UpdatePinScreen";
import pinConfirmedState from "module/settings/state/PinConfirmedState";
import { useRecoilValue } from "recoil";
import Stack from "stack-navigator";

export enum MainScreens {
    MAIN = "Main",
    UPDATE_PIN = "UpdatePin",
}

const MainNavigator = () => {
    const { pinConfirmed } = useRecoilValue(pinConfirmedState);
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={MainScreens.MAIN} component={MainBottomNavigatorGroup} />
            <Stack.Screen
                name={MainScreens.UPDATE_PIN}
                component={pinConfirmed ? UpdatePinScreen : ConfirmPinScreen}
                options={{ animation: "fade_from_bottom", presentation: "modal" }}
            />
        </Stack.Navigator>
    );
};

export default MainNavigator;
