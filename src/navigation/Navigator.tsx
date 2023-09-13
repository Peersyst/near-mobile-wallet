import { NavigationContainer } from "@react-navigation/native";
import AuthNavigatorGroup from "module/auth/AuthNavigatorGroup";
import { useRecoilValue } from "recoil";
import walletState from "module/wallet/state/WalletState";
import MainNavigator from "module/common/component/navigation/MainNavigatorGroup/MainNavigatorGroup";
import { ModalProvider } from "@peersyst/react-native-components";
import linking from "./Navigator.linking";

const Navigator = (): JSX.Element => {
    const { isAuthenticated } = useRecoilValue(walletState);

    return (
        <NavigationContainer linking={linking}>
            <ModalProvider>{isAuthenticated ? <MainNavigator /> : <AuthNavigatorGroup />}</ModalProvider>
        </NavigationContainer>
    );
};

export default Navigator;
