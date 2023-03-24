import { NavigationContainer } from "@react-navigation/native";
import AuthNavigatorGroup from "module/auth/AuthNavigatorGroup";
import { useRecoilValue } from "recoil";
import walletState from "module/wallet/state/WalletState";
import MainNavigator from "module/common/component/navigation/MainNavigatorGroup/MainNavigatorGroup";

const Navigator = (): JSX.Element => {
    const { isAuthenticated } = useRecoilValue(walletState);

    return <NavigationContainer>{isAuthenticated ? <MainNavigator /> : <AuthNavigatorGroup />}</NavigationContainer>;
};

export default Navigator;
