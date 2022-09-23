import { useLogoPageFlex, useLogoPageGradient } from "module/common/component/layout/LogoPage/LogoPageContext";
import { TabPanel, Tabs, useTabs } from "@peersyst/react-native-components";
import { useState } from "react";
import { AuthScreens } from "module/auth/AuthNavigatorGroup";
import SetWalletNameScreen from "module/wallet/screen/SetWalletNameScreen";
import SetWalletPinScreen from "module/wallet/screen/SetWalletPinScreen";
import ImportWalletSuccessScreen from "module/wallet/screen/CreateWalletSuccessScreen";
import { useBackHandler } from "@react-native-community/hooks";
import EnterWalletMnemonicScreen from "module/wallet/screen/EnterWalletMnemonicScreen";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import WalletAdvisesScreen from "module/wallet/screen/WalletAdvisesScreen/WalletAdvisesScreen";
import { useResetRecoilState } from "recoil";
import createWalletState from "../state/CreateWalletState";
import { useTranslate } from "module/common/hook/useTranslate";
import LightThemeProvider from "module/common/component/util/ThemeProvider/LightThemeProvider";
import DarkThemeProvider from "module/common/component/util/ThemeProvider/DarkThemeProvider";

export enum ImportWalletScreens {
    SET_WALLET_NAME,
    WALLET_ADVISES,
    ENTER_WALLET_MNEMONIC,
    SET_WALLET_PIN,
    IMPORT_WALLET_SUCCESS,
}

const ImportWalletNavigatorGroup = () => {
    const translate = useTranslate();
    const [activeTab, setActiveTab] = useState(0);
    const setTab = useTabs()[1];
    const [showGlass, setShowGlass] = useState(true);
    const [showPin, setShowPin] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    useLogoPageFlex(showSuccess ? 1 : 0.4);
    useLogoPageGradient(false);
    const resetCreateWalletState = useResetRecoilState(createWalletState);
    useBackHandler(() => {
        handleBack();
        return true;
    });

    const handleBack = () => {
        if (activeTab === ImportWalletScreens.SET_WALLET_NAME) {
            setShowGlass(false);
        } else if (activeTab === ImportWalletScreens.SET_WALLET_PIN) {
            setShowPin(false);
            setShowGlass(true);
            setActiveTab(ImportWalletScreens.ENTER_WALLET_MNEMONIC);
        } else if (activeTab >= 0) setActiveTab((t) => t - 1);
    };

    const handleTabChange = (t: number) => {
        if (t === ImportWalletScreens.SET_WALLET_PIN) {
            setShowPin(true);
            setShowGlass(false);
        } else if (t === ImportWalletScreens.IMPORT_WALLET_SUCCESS) {
            setShowPin(false);
            setShowSuccess(true);
            setActiveTab(t);
        } else setActiveTab(t);
    };

    const handleGlassExit = () => {
        if (showPin) setActiveTab(ImportWalletScreens.SET_WALLET_PIN);
        else if (showSuccess) setActiveTab(ImportWalletScreens.IMPORT_WALLET_SUCCESS);
        else {
            resetCreateWalletState();
            setTab(AuthScreens.AUTH_SWITCH);
        }
    };

    return (
        <Tabs index={activeTab} onIndexChange={handleTabChange}>
            <LightThemeProvider>
                <CardNavigatorModal
                    renderBackdrop={false}
                    onClose={() => setShowGlass(false)}
                    open={showGlass}
                    onExited={handleGlassExit}
                    navbar={{ back: true, title: translate("import_wallet"), onBack: handleBack, steps: { index: activeTab, length: 3 } }}
                >
                    <TabPanel index={ImportWalletScreens.SET_WALLET_NAME}>
                        <SetWalletNameScreen
                            onSubmit={() => handleTabChange(ImportWalletScreens.WALLET_ADVISES)}
                            submitText={translate("enter_mnemonic")}
                        />
                    </TabPanel>
                    <TabPanel index={ImportWalletScreens.WALLET_ADVISES}>
                        <WalletAdvisesScreen
                            onNextScreen={() => handleTabChange(ImportWalletScreens.ENTER_WALLET_MNEMONIC)}
                            useTimer={false}
                            nextScreenText={translate("enter_mnemonic")}
                        />
                    </TabPanel>
                    <TabPanel index={ImportWalletScreens.ENTER_WALLET_MNEMONIC}>
                        <EnterWalletMnemonicScreen
                            onSubmit={() => handleTabChange(ImportWalletScreens.SET_WALLET_PIN)}
                            submitText={translate("set_pin")}
                        />
                    </TabPanel>
                </CardNavigatorModal>
            </LightThemeProvider>
            <DarkThemeProvider>
                <TabPanel index={ImportWalletScreens.SET_WALLET_PIN}>
                    <SetWalletPinScreen
                        onSuccess={() => handleTabChange(ImportWalletScreens.IMPORT_WALLET_SUCCESS)}
                        onCancel={handleBack}
                    />
                </TabPanel>
                <TabPanel index={ImportWalletScreens.IMPORT_WALLET_SUCCESS}>
                    <ImportWalletSuccessScreen />
                </TabPanel>
            </DarkThemeProvider>
        </Tabs>
    );
};

export default ImportWalletNavigatorGroup;
