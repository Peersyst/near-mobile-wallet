import { MainNavigatorGroup, MainScreens } from "module/main/MainNavigatorGroup";
import { NavigationContainer } from "@react-navigation/native";
import Stack from "stack-navigator";
import AuthNavigatorGroup from "module/auth/AuthNavigatorGroup";
import { useRecoilValue } from "recoil";
import walletState from "module/wallet/state/WalletState";

const Navigator = (): JSX.Element => {
    const { isAuthenticated } = useRecoilValue(walletState);
    return (
        <NavigationContainer>
            {isAuthenticated ? (
                <Stack.Navigator
                    initialRouteName={MainScreens.MAIN}
                    screenOptions={{ headerShown: false, animation: "slide_from_right", gestureEnabled: false }}
                >
                    {MainNavigatorGroup}
                </Stack.Navigator>
            ) : (
                <AuthNavigatorGroup />
            )}
        </NavigationContainer>
    );
};

export default Navigator;
