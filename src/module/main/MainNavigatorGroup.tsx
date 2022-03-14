import MainBottomNavigatorGroup from "module/main/component/navigation/MainBottomNavigatorGroup/MainBottomNavigatorGroup";
import Stack from "stack-navigator";
import SendNavigatorGroup from "module/transaction/SendNavigatorGroup";

export enum MainScreens {
    MAIN = "Main",
    SEND = "Send",
    RECEIVE = "Receive",
}

const MainNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={MainScreens.MAIN} component={MainBottomNavigatorGroup} />
            <Stack.Screen name={MainScreens.SEND} component={SendNavigatorGroup} options={{ animation: "slide_from_right" }} />
            <Stack.Screen name={MainScreens.RECEIVE} component={SendNavigatorGroup} options={{ animation: "slide_from_right" }} />
        </Stack.Navigator>
    );
};

export default MainNavigator;
