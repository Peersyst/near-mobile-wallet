import { createModal, ExposedBackdropProps, TabPanel, Tabs } from "@peersyst/react-native-components";
import SetWalletNameScreen from "module/wallet/screen/SetWalletNameScreen";
import { useState } from "react";
import AddWalletModal from "module/wallet/component/core/AddWalletModal/AddWalletModal";
import EnterWalletMnemonicScreen from "module/wallet/screen/EnterWalletMnemonicScreen";
import WalletAdvisesScreen from "module/wallet/screen/WalletAdvisesScreen";
import { useTranslate } from "module/common/hook/useTranslate";
import SelectMnemonicOrPrivateKeyScreen from "module/wallet/screen/SelectMnemonicOrPrivateKeyScreen/SelectMnemonicOrPrivateKeyScreen";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import EnterPrivateKeyScreen from "module/wallet/screen/EnterPrivateKeyScreen/EnterPrivateKeyScreen";

const ImportWalletModal = createModal((props: ExposedBackdropProps) => {
    const [index, setIndex] = useState(0);
    const {
        state: { importWithPrivateKey },
    } = useCreateWallet();
    const translate = useTranslate();

    return (
        <AddWalletModal imported title={translate("import_wallet")} onBack={index ? () => setIndex((i) => i - 1) : undefined} {...props}>
            {(handleWalletCreation) => (
                <Tabs index={index} onIndexChange={setIndex}>
                    <TabPanel index={0}>
                        <SelectMnemonicOrPrivateKeyScreen onSubmit={() => setIndex(1)} />
                    </TabPanel>
                    <TabPanel index={1}>
                        {importWithPrivateKey ? (
                            <EnterPrivateKeyScreen onSubmit={handleWalletCreation} submitText={translate("import_wallet")} />
                        ) : (
                            <EnterWalletMnemonicScreen onSubmit={handleWalletCreation} submitText={translate("import_wallet")} />
                        )}
                    </TabPanel>
                </Tabs>
            )}
        </AddWalletModal>
    );
});

export default ImportWalletModal;
