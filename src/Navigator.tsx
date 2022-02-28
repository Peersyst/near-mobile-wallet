import { DashboardNavigator, DashboardScreens } from "module/dashboard/DashboardNavigator";
import { NavigationContainer } from "@react-navigation/native";
import Stack from "stack-navigator";
import { AuthGroup } from "module/auth/navigation/AuthGroup";
import { useAuth } from "module/auth/hook/useAuth";

const Navigator = (): JSX.Element => {
    const {
        state: { isLogged },
    } = useAuth();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={DashboardScreens.WELCOME_BACK} screenOptions={{ headerShown: false }}>
                {isLogged ? DashboardNavigator : AuthGroup}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigator;
