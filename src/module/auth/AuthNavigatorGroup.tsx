import AuthSwitchPage from "./screen/AuthSwitchPage/AuthSwitchPage";
import ImportWalletPage from "./screen/ImportWalletPage/ImportWalletPage";
import { TabPanel, Tabs } from "react-native-components";
import LogoPage from "module/common/component/layout/LogoPage/LogoPage";
import CreateWalletNavigatorGroup from "module/wallet/CreateWalletNavigatorGroup";

export enum AuthScreens {
    AUTH_SWITCH,
    IMPORT_WALLET,
    CREATE_WALLET,
}

const AuthNavigatorGroup = (
    <LogoPage>
        <Tabs>
            <TabPanel index={AuthScreens.AUTH_SWITCH}>
                <AuthSwitchPage />
            </TabPanel>
            <TabPanel index={AuthScreens.IMPORT_WALLET}>
                <ImportWalletPage />
            </TabPanel>
            <TabPanel index={AuthScreens.CREATE_WALLET}>
                <CreateWalletNavigatorGroup />
            </TabPanel>
        </Tabs>
    </LogoPage>
);

export default AuthNavigatorGroup;
