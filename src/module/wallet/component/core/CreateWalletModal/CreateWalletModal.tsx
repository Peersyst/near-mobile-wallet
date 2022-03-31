import { createModal, ExposedBackdropProps, TabPanel, Tabs } from "react-native-components";
import { translate } from "locale";
import { CreateWalletScreens } from "module/wallet/navigator/CreateWalletNavigatorGroup";
import SetWalletNameScreen from "module/wallet/screen/SetWalletNameScreen";
import WalletAdvisesScreen from "module/wallet/screen/WalletAdvisesScreen";
import WalletMnemonicScreen from "module/wallet/screen/WalletMnemonicScreen";
import PickWalletMnemonicScreen from "module/wallet/screen/PickWalletMnemonicScreen";
import GlassNavigatorModal from "module/common/component/navigation/GlassNavigatorModal/GlassNavigatorModal";
import { useState } from "react";

const CreateWalletModal = createModal((props: ExposedBackdropProps) => {
    const [index, setIndex] = useState(0);

    return (
        <GlassNavigatorModal navbar={{ back: true, title: translate("create_wallet") }} scrollable {...props}>
            <Tabs index={index} onIndexChange={setIndex}>
                <TabPanel index={CreateWalletScreens.SET_WALLET_NAME}>
                    <SetWalletNameScreen onSubmit={() => undefined} submitText={translate("set_pin")} />
                </TabPanel>
                <TabPanel index={CreateWalletScreens.WALLET_ADVISES}>
                    <WalletAdvisesScreen />
                </TabPanel>
                <TabPanel index={CreateWalletScreens.WALLET_MNEMONIC}>
                    <WalletMnemonicScreen />
                </TabPanel>
                <TabPanel index={CreateWalletScreens.PICK_WALLET_MNEMONIC}>
                    <PickWalletMnemonicScreen />
                </TabPanel>
            </Tabs>
        </GlassNavigatorModal>
    );
});

export default CreateWalletModal;
