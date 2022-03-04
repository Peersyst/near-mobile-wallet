import { useLogoPageFlex } from "module/common/component/layout/LogoPage/LogoPageContext";
import { Animated, TabPanel, Tabs, useTabs } from "react-native-components";
import { useState } from "react";
import { AuthScreens } from "module/auth/AuthNavigatorGroup";
import SetWalletNameScreen from "module/wallet/screen/SetWalletNameScreen";
import { translate } from "locale";
import GlassNavigator from "module/common/component/navigation/GlassNavigator/GlassNavigator";
import SetWalletPinScreen from "module/wallet/screen/SetWalletPinScreen";
import WalletAdvisesScreen from "module/wallet/screen/WalletAdvisesScreen";

export enum CreateWalletScreens {
    SET_WALLET_NAME,
    WALLET_ADVISES,
    WALLET_MNEMONIC,
    ENTER_WALLET_MNEMONIC,
    SET_WALLET_PIN,
}

const AnimatedGlassNavigator = Animated.createAnimatedComponent.slide(GlassNavigator, {
    duration: 400,
    appear: true,
    direction: "up",
    unmountOnExit: true,
});

const CreateWalletNavigatorGroup = () => {
    const [activeTab, setActiveTab] = useState(0);
    const setTab = useTabs()[1];
    const [showGlass, setShowGlass] = useState(true);
    const [showPin, setShowPin] = useState(false);
    useLogoPageFlex(showPin ? 0.1 : 0.4);

    const handleBack = () => {
        if (activeTab === CreateWalletScreens.SET_WALLET_NAME) {
            setShowGlass(false);
        } else if (activeTab === CreateWalletScreens.SET_WALLET_PIN) {
            setShowPin(false);
            setShowGlass(true);
            setActiveTab(CreateWalletScreens.SET_WALLET_NAME);
        } else if (activeTab === CreateWalletScreens.WALLET_ADVISES) {
            setShowPin(true);
            setShowGlass(false);
        } else setActiveTab((t) => t - 1);
    };

    const handleTabChange = (t: number) => {
        if (t === CreateWalletScreens.SET_WALLET_PIN) {
            setShowPin(true);
            setShowGlass(false);
        } else if (t === CreateWalletScreens.SET_WALLET_NAME || t === CreateWalletScreens.WALLET_ADVISES) {
            setShowPin(false);
            setShowGlass(true);
            setActiveTab(t);
        } else setActiveTab(t);
    };

    return (
        <Tabs index={activeTab} onIndexChange={handleTabChange}>
            <AnimatedGlassNavigator
                in={showGlass}
                appear
                style={{ height: "170%", flex: 1 }}
                onExited={() => (showPin ? setActiveTab(CreateWalletScreens.SET_WALLET_PIN) : setTab(AuthScreens.AUTH_SWITCH))}
                navbar={{ back: true, title: translate("create_wallet"), onBack: handleBack }}
                breadcrumbs={{ index: activeTab + 1, length: 4 }}
            >
                <TabPanel index={CreateWalletScreens.SET_WALLET_NAME}>
                    <SetWalletNameScreen />
                </TabPanel>
                <TabPanel index={CreateWalletScreens.WALLET_ADVISES}>
                    <WalletAdvisesScreen />
                </TabPanel>
                <TabPanel index={CreateWalletScreens.WALLET_MNEMONIC}>
                    <SetWalletNameScreen />
                </TabPanel>
                <TabPanel index={CreateWalletScreens.ENTER_WALLET_MNEMONIC}>
                    <SetWalletNameScreen />
                </TabPanel>
            </AnimatedGlassNavigator>
            <TabPanel index={CreateWalletScreens.SET_WALLET_PIN}>
                <SetWalletPinScreen />
            </TabPanel>
        </Tabs>
    );
};

export default CreateWalletNavigatorGroup;
