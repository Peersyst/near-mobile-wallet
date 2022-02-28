import { MainNavigatorGroup, DashboardScreens } from "module/main/MainNavigatorGroup";
import { NavigationContainer } from "@react-navigation/native";
import Stack from "stack-navigator";
import { AuthNavigatorGroup } from "module/auth/navigation/AuthNavigationGroup";

import { useAuth } from "module/auth/hook/useAuth";

const Navigator = (): JSX.Element => {
    const {
        state: { isLogged },
    } = useAuth();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={DashboardScreens.WELCOME_BACK} screenOptions={{ headerShown: false }}>
                {isLogged ? MainNavigatorGroup : AuthNavigatorGroup}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigator;
