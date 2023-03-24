import { NavigationContainer } from "@react-navigation/native";
import AuthNavigatorGroup from "module/auth/AuthNavigatorGroup";
import { useRecoilValue } from "recoil";
import walletState from "module/wallet/state/WalletState";
import MainNavigator from "module/common/component/navigation/MainNavigatorGroup/MainNavigatorGroup";
import { ModalProvider } from "@peersyst/react-native-components";
import WalletColorProvider from "module/wallet/component/core/WalletColorProvider/WalletColorProvider";

const Navigator = (): JSX.Element => {
    const { isAuthenticated } = useRecoilValue(walletState);

    return (
        <NavigationContainer>
            <ModalProvider>
                {isAuthenticated ? (
                    <WalletColorProvider>
                        <MainNavigator />
                    </WalletColorProvider>
                ) : (
                    <AuthNavigatorGroup />
                )}
            </ModalProvider>
        </NavigationContainer>
    );
};

export default Navigator;
