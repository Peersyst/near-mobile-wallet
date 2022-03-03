import { MainNavigatorGroup, MainScreens } from "module/main/MainNavigatorGroup";
import { NavigationContainer } from "@react-navigation/native";
import Stack from "stack-navigator";
import { useAuth } from "module/auth/hook/useAuth";
import AuthNavigatorGroup, { AuthScreens } from "module/auth/navigation/AuthNavigatorGroup";

const Navigator = (): JSX.Element => {
    const {
        state: { token, isLogged },
    } = useAuth();

    const initialRoute = isLogged ? MainScreens.WELCOME_BACK : token ? AuthScreens.LOGIN : AuthScreens.AUTH_SWITCH;

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
                {!isLogged ? MainNavigatorGroup : AuthNavigatorGroup}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigator;
