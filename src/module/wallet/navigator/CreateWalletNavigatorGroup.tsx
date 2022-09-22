import { useLogoPageFlex } from "module/common/component/layout/LogoPage/LogoPageContext";
import { TabPanel, Tabs, useTabs } from "@peersyst/react-native-components";
import { useState } from "react";
import { AuthScreens } from "module/auth/AuthNavigatorGroup";
import SetWalletNameScreen from "module/wallet/screen/SetWalletNameScreen";
import SetWalletPinScreen from "module/wallet/screen/SetWalletPinScreen";
import WalletAdvisesScreen from "module/wallet/screen/WalletAdvisesScreen/WalletAdvisesScreen";
import WalletMnemonicScreen from "module/wallet/screen/WalletMnemonicScreen";
import PickWalletMnemonicScreen from "module/wallet/screen/PickWalletMnemonicScreen";
import CreateWalletSuccessScreen from "module/wallet/screen/CreateWalletSuccessScreen";
import { useBackHandler } from "@react-native-community/hooks";
import GlassNavigatorModal from "module/common/component/navigation/GlassNavigatorModal/GlassNavigatorModal";
import { useResetRecoilState } from "recoil";
import createWalletState from "module/wallet/state/CreateWalletState";
import { useTranslate } from "module/common/hook/useTranslate";

export enum CreateWalletScreens {
    SET_WALLET_NAME,
    WALLET_ADVISES,
    WALLET_MNEMONIC,
    PICK_WALLET_MNEMONIC,
    SET_WALLET_PIN,
    CREATE_WALLET_SUCCESS,
}

const CreateWalletNavigatorGroup = () => {
    const translate = useTranslate();
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
    const resetCreateWalletState = useResetRecoilState(createWalletState);

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
        } else if (activeTab >= 0) setActiveTab((t) => t - 1);
    };

    const handleTabChange = (t: number) => {
        if (t === CreateWalletScreens.SET_WALLET_PIN) {
            setShowPin(true);
            setShowGlass(false);
        } else if (t === CreateWalletScreens.SET_WALLET_NAME || t === CreateWalletScreens.WALLET_ADVISES) {
            setShowPin(false);
            setShowGlass(true);
            setActiveTab(t);
        } else if (t === CreateWalletScreens.CREATE_WALLET_SUCCESS) {
            setShowGlass(false);
            setShowSuccess(true);
        } else setActiveTab(t);
    };

    const handleGlassExit = () => {
        if (showPin) setActiveTab(CreateWalletScreens.SET_WALLET_PIN);
        else if (showSuccess) setActiveTab(CreateWalletScreens.CREATE_WALLET_SUCCESS);
        else {
            resetCreateWalletState();
            setTab(AuthScreens.AUTH_SWITCH);
        }
    };

    return (
        <Tabs index={activeTab} onIndexChange={handleTabChange}>
            <GlassNavigatorModal
                onClose={() => setShowGlass(false)}
                open={showGlass}
                onExited={handleGlassExit}
                navbar={{ back: true, title: translate("create_wallet"), onBack: handleBack }}
                breadcrumbs={{ index: activeTab, length: 4 }}
                renderBackdrop={false}
            >
                <TabPanel index={CreateWalletScreens.SET_WALLET_NAME}>
                    <SetWalletNameScreen
                        onSubmit={() => handleTabChange(CreateWalletScreens.SET_WALLET_PIN)}
                        submitText={translate("set_pin")}
                    />
                </TabPanel>
                <TabPanel index={CreateWalletScreens.WALLET_ADVISES}>
                    <WalletAdvisesScreen
                        onNextScreen={() => handleTabChange(CreateWalletScreens.WALLET_MNEMONIC)}
                        nextScreenText={translate("generate_mnemonic")}
                    />
                </TabPanel>
                <TabPanel index={CreateWalletScreens.WALLET_MNEMONIC}>
                    <WalletMnemonicScreen onNextScreen={() => handleTabChange(CreateWalletScreens.PICK_WALLET_MNEMONIC)} />
                </TabPanel>
                <TabPanel index={CreateWalletScreens.PICK_WALLET_MNEMONIC}>
                    <PickWalletMnemonicScreen onSubmit={() => handleTabChange(CreateWalletScreens.CREATE_WALLET_SUCCESS)} />
                </TabPanel>
            </GlassNavigatorModal>
            <TabPanel index={CreateWalletScreens.SET_WALLET_PIN}>
                <SetWalletPinScreen
                    onSuccess={() => handleTabChange(CreateWalletScreens.WALLET_ADVISES)}
                    onCancel={() => handleTabChange(CreateWalletScreens.SET_WALLET_NAME)}
                />
            </TabPanel>
            <TabPanel index={CreateWalletScreens.CREATE_WALLET_SUCCESS}>
                <CreateWalletSuccessScreen />
            </TabPanel>
        </Tabs>
    );
};

export default CreateWalletNavigatorGroup;
