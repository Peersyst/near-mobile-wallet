import { MainNavigatorGroup, MainScreens } from "module/main/MainNavigatorGroup";
import { NavigationContainer } from "@react-navigation/native";
import Stack from "stack-navigator";
import { useAuth } from "module/auth/hook/useAuth";
import AuthNavigatorGroup from "module/auth/AuthNavigatorGroup";

const Navigator = (): JSX.Element => {
    const {
        state: { isLogged },
    } = useAuth();

    return (
        <NavigationContainer>
            {!isLogged ? (
                <Stack.Navigator
                    initialRouteName={MainScreens.WELCOME_BACK}
                    screenOptions={{ headerShown: false, animation: "slide_from_right" }}
                >
                    {MainNavigatorGroup}
                </Stack.Navigator>
            ) : (
                AuthNavigatorGroup
            )}
        </NavigationContainer>
    );
};

export default Navigator;
