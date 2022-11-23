import AuthSwitchScreen from "./screen/AuthSwitchScreen/AuthSwitchScreen";
import { TabPanel, Tabs } from "@peersyst/react-native-components";
import LogoPage from "module/common/component/layout/LogoPage/LogoPage";
import CreateWalletNavigatorGroup from "module/wallet/navigator/CreateWalletNavigatorGroup";
import ImportWalletNavigatorGroup from "module/wallet/navigator/ImportWalletNavigatorGroup";
import { useRecoilValue } from "recoil";
import walletState from "module/wallet/state/WalletState";
import WelcomeBackScreen from "module/auth/screen/WelcomeBackScreen/WelcomeBackScreen";
import IntroduceWalletPinScreen from "module/wallet/screen/IntroduceWalletPinScreen";

export enum AuthScreens {
    AUTH_SWITCH,
    IMPORT_WALLET,
    CREATE_WALLET,
    WELCOME_BACK,
    INTRODUCE_PIN,
}

const AuthNavigatorGroup = () => {
    const { hasWallet } = useRecoilValue(walletState);

    return (
        <LogoPage>
            {hasWallet ? (
                <Tabs initialIndex={AuthScreens.WELCOME_BACK}>
                    <TabPanel index={AuthScreens.WELCOME_BACK}>
                        <WelcomeBackScreen />
                    </TabPanel>
                    <TabPanel index={AuthScreens.INTRODUCE_PIN}>
                        <IntroduceWalletPinScreen />
                    </TabPanel>
                </Tabs>
            ) : (
                <Tabs>
                    <TabPanel index={AuthScreens.AUTH_SWITCH}>
                        <AuthSwitchScreen />
                    </TabPanel>
                    <TabPanel index={AuthScreens.IMPORT_WALLET}>
                        <ImportWalletNavigatorGroup />
                    </TabPanel>
                    <TabPanel index={AuthScreens.CREATE_WALLET}>
                        <CreateWalletNavigatorGroup />
                    </TabPanel>
                </Tabs>
            )}
        </LogoPage>
    );
};

export default AuthNavigatorGroup;
