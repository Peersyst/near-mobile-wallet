import { createModal, ExposedBackdropProps, TabPanel, Tabs } from "react-native-components";
import { translate } from "locale";
import SetWalletNameScreen from "module/wallet/screen/SetWalletNameScreen";
import WalletAdvisesScreen from "module/wallet/screen/WalletAdvisesScreen";
import WalletMnemonicScreen from "module/wallet/screen/WalletMnemonicScreen";
import PickWalletMnemonicScreen from "module/wallet/screen/PickWalletMnemonicScreen";
import { useState } from "react";
import AddWalletModal from "module/wallet/component/core/AddWalletModal/AddWalletModal";

const CreateWalletModal = createModal((props: ExposedBackdropProps) => {
    const [index, setIndex] = useState(0);

    return (
        <AddWalletModal title={translate("create_wallet")} onBack={index ? () => setIndex((i) => i - 1) : undefined} {...props}>
            {(handleWalletCreation) => (
                <Tabs index={index} onIndexChange={setIndex}>
                    <TabPanel index={0}>
                        <SetWalletNameScreen onSubmit={() => setIndex(1)} submitText={translate("next")} />
                    </TabPanel>
                    <TabPanel index={1}>
                        <WalletAdvisesScreen onNextScreen={() => setIndex(2)} />
                    </TabPanel>
                    <TabPanel index={2}>
                        <WalletMnemonicScreen onNextScreen={() => setIndex(3)} />
                    </TabPanel>
                    <TabPanel index={3}>
                        <PickWalletMnemonicScreen onSubmit={handleWalletCreation} />
                    </TabPanel>
                </Tabs>
            )}
        </AddWalletModal>
    );
});

export default CreateWalletModal;
