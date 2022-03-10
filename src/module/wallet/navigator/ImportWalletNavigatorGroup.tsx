import { useLogoPageFlex } from "module/common/component/layout/LogoPage/LogoPageContext";
import { Animated, TabPanel, Tabs, useTabs } from "react-native-components";
import { useState } from "react";
import { AuthScreens } from "module/auth/AuthNavigatorGroup";
import SetWalletNameScreen from "module/wallet/screen/SetWalletNameScreen";
import { translate } from "locale";
import GlassNavigator from "module/common/component/navigation/GlassNavigator/GlassNavigator";
import SetWalletPinScreen from "module/wallet/screen/SetWalletPinScreen";
import ImportWalletSuccessScreen from "module/wallet/screen/CreateWalletSuccessScreen";
import { useBackHandler } from "@react-native-community/hooks";
import EnterWalletMnemonicScreen from "module/wallet/screen/EnterWalletMnemonicScreen";

export enum ImportWalletScreens {
    SET_WALLET_NAME,
    ENTER_WALLET_MNEMONIC,
    SET_WALLET_PIN,
    IMPORT_WALLET_SUCCESS,
}

const AnimatedGlassNavigator = Animated.createAnimatedComponent.slide(GlassNavigator, {
    duration: 400,
    appear: true,
    direction: "up",
    unmountOnExit: true,
});

const ImportWalletNavigatorGroup = () => {
    const [activeTab, setActiveTab] = useState(0);
    const setTab = useTabs()[1];
    const [showGlass, setShowGlass] = useState(true);
    const [showPin, setShowPin] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    useLogoPageFlex(showPin ? 0.1 : showSuccess ? 1 : 0.4);
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
        else setTab(AuthScreens.AUTH_SWITCH);
    };

    return (
        <Tabs index={activeTab} onIndexChange={handleTabChange}>
            <AnimatedGlassNavigator
                in={showGlass}
                appear
                style={{ height: "170%", flex: 1 }}
                onExited={handleGlassExit}
                navbar={{ back: true, title: translate("import_wallet"), onBack: handleBack }}
                breadcrumbs={{ index: activeTab, length: 2 }}
            >
                <TabPanel index={ImportWalletScreens.SET_WALLET_NAME}>
                    <SetWalletNameScreen
                        onSubmit={() => handleTabChange(ImportWalletScreens.ENTER_WALLET_MNEMONIC)}
                        submitText={translate("enter_mnemonic")}
                    />
                </TabPanel>
                <TabPanel index={ImportWalletScreens.ENTER_WALLET_MNEMONIC}>
                    <EnterWalletMnemonicScreen />
                </TabPanel>
            </AnimatedGlassNavigator>
            <TabPanel index={ImportWalletScreens.SET_WALLET_PIN}>
                <SetWalletPinScreen onSuccess={() => handleTabChange(ImportWalletScreens.IMPORT_WALLET_SUCCESS)} onCancel={handleBack} />
            </TabPanel>
            <TabPanel index={ImportWalletScreens.IMPORT_WALLET_SUCCESS}>
                <ImportWalletSuccessScreen />
            </TabPanel>
        </Tabs>
    );
};

export default ImportWalletNavigatorGroup;
