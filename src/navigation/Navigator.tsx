import { NavigationContainer } from "@react-navigation/native";
import AuthNavigatorGroup from "module/auth/AuthNavigatorGroup";
import MainNavigator from "module/common/component/navigation/MainNavigatorGroup/MainNavigatorGroup";
import { ModalProvider } from "@peersyst/react-native-components";
import linking from "./Navigator.linking";
import { AnalyticsProvider } from "../refactor/ui/analytics/AnalyticsProvider";
import useAuthState from "refactor/ui/adapter/state/useAuthState";

const Navigator = (): JSX.Element => {
    // <<< refactor
    const { isAuthenticated } = useAuthState();
    // refactor >>>

    return (
        <NavigationContainer linking={linking}>
            {/* We have to add here the AnalyticsProvider because it needs to be wrapped inside a Navigator */}
            <AnalyticsProvider>
                <ModalProvider>{isAuthenticated ? <MainNavigator /> : <AuthNavigatorGroup />}</ModalProvider>
            </AnalyticsProvider>
        </NavigationContainer>
    );
};

export default Navigator;
