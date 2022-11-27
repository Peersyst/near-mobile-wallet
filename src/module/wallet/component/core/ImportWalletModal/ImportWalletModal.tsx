import { createModal, ExposedBackdropProps, TabPanel, Tabs } from "@peersyst/react-native-components";
import SetWalletNameScreen from "module/wallet/screen/SetWalletNameScreen";
import { useState } from "react";
import AddWalletModal from "module/wallet/component/core/AddWalletModal/AddWalletModal";
import EnterWalletMnemonicScreen from "module/wallet/screen/EnterWalletMnemonicScreen";
import WalletAdvisesScreen from "module/wallet/screen/WalletAdvisesScreen";
import { useTranslate } from "module/common/hook/useTranslate";

const ImportWalletModal = createModal((props: ExposedBackdropProps) => {
    const [index, setIndex] = useState(0);
    const translate = useTranslate();
    //TODO: import by privateKey
    return (
        <AddWalletModal imported title={translate("import_wallet")} onBack={index ? () => setIndex((i) => i - 1) : undefined} {...props}>
            {(handleWalletCreation) => (
                <Tabs index={index} onIndexChange={setIndex}>
                    <TabPanel index={0}>
                        <SetWalletNameScreen onSubmit={() => setIndex(1)} submitText={translate("next")} />
                    </TabPanel>
                    <TabPanel index={1}>
                        <WalletAdvisesScreen
                            onNextScreen={() => setIndex(2)}
                            ensureReading={false}
                            nextScreenText={translate("enter_mnemonic")}
                        />
                    </TabPanel>
                    <TabPanel index={2}>
                        <EnterWalletMnemonicScreen onSubmit={handleWalletCreation} submitText={translate("import_wallet")} />
                    </TabPanel>
                </Tabs>
            )}
        </AddWalletModal>
    );
});

export default ImportWalletModal;
