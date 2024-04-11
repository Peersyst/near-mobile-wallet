import { NavigationContainer } from "@react-navigation/native";
import AuthNavigatorGroup from "module/auth/AuthNavigatorGroup";
import { useRecoilValue } from "recoil";
import walletState from "module/wallet/state/WalletState";
import MainNavigator from "module/common/component/navigation/MainNavigatorGroup/MainNavigatorGroup";
import { ModalProvider } from "@peersyst/react-native-components";
import linking from "./Navigator.linking";
import { AnalyticsProvider } from "../analytics/AnalyticsProvider";
import { AppUpdater } from "module/common/component/feedback/AppUpdater/AppUpdater";

const Navigator = (): JSX.Element => {
    const { isAuthenticated } = useRecoilValue(walletState);

    return (
        <NavigationContainer linking={linking}>
            {/* We have to add here the AnalyticsProvider because it needs to be wrapped inside a Navigator */}
            <AnalyticsProvider>
                <ModalProvider>
                    {isAuthenticated ? <MainNavigator /> : <AuthNavigatorGroup />}
                    <AppUpdater />
                </ModalProvider>
            </AnalyticsProvider>
        </NavigationContainer>
    );
};

export default Navigator;
