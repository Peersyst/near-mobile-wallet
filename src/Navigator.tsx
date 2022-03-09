import { MainNavigatorGroup, MainScreens } from "module/main/MainNavigatorGroup";
import { NavigationContainer } from "@react-navigation/native";
import Stack from "stack-navigator";
import AuthNavigatorGroup from "module/auth/AuthNavigatorGroup";
import { useRecoilValue } from "recoil";
import walletState from "module/wallet/state/WalletState";

const Navigator = (): JSX.Element => {
    const { hasWallet, isAuthenticated } = useRecoilValue(walletState);
    return (
        <NavigationContainer>
            {!hasWallet && !isAuthenticated ? (
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
