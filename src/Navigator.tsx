import { NavigationContainer } from "@react-navigation/native";
import AuthNavigatorGroup from "module/auth/AuthNavigatorGroup";
import { useRecoilValue } from "recoil";
import walletState from "module/wallet/state/WalletState";
import MainNavigator from "module/main/MainNavigatorGroup";
import { ModalProvider } from "@peersyst/react-native-components";

const Navigator = (): JSX.Element => {
    const { isAuthenticated } = useRecoilValue(walletState);

    return (
        <NavigationContainer>
            <ModalProvider>{isAuthenticated ? <MainNavigator /> : <AuthNavigatorGroup />}</ModalProvider>
        </NavigationContainer>
    );
};

export default Navigator;
