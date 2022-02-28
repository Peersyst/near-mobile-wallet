import { MainNavigatorGroup, MainScreens } from "module/main/MainNavigatorGroup";
import { NavigationContainer } from "@react-navigation/native";
import Stack from "stack-navigator";
import { AuthNavigatorGroup, AuthScreen } from "module/auth/navigation/AuthNavigationGroup";

import { useAuth } from "module/auth/hook/useAuth";

const Navigator = (): JSX.Element => {
    const {
        state: { token, isLogged },
    } = useAuth();

    const initialRoute = isLogged ? MainScreens.WELCOME_BACK : token ? AuthScreen.LOGIN : AuthScreen.AUTH_SWITCH;

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
                {isLogged ? MainNavigatorGroup : AuthNavigatorGroup}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigator;
