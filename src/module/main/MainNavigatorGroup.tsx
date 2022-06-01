import MainBottomNavigatorGroup from "module/main/component/navigation/MainBottomNavigatorGroup/MainBottomNavigatorGroup";
import Stack from "stack-navigator";

export enum MainScreens {
    MAIN = "Main",
}

const MainNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={MainScreens.MAIN} component={MainBottomNavigatorGroup} />
        </Stack.Navigator>
    );
};

export default MainNavigator;
