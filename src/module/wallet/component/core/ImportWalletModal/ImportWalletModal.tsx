import { createModal, ExposedBackdropProps, TabPanel, Tabs } from "@peersyst/react-native-components";
import { useState } from "react";
import AddWalletModal from "module/wallet/component/core/AddWalletModal/AddWalletModal";
import EnterWalletMnemonicScreen from "module/wallet/screen/EnterWalletMnemonicScreen";
import { useTranslate } from "module/common/hook/useTranslate";
import SelectMnemonicOrPrivateKeyScreen from "module/wallet/screen/SelectMnemonicOrPrivateKeyScreen/SelectMnemonicOrPrivateKeyScreen";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import EnterPrivateKeyScreen from "module/wallet/screen/EnterPrivateKeyScreen/EnterPrivateKeyScreen";

export enum ImportWalletModalTabs {
    CHOOSE_MNEMONIC_OR_PRIVATE_KEY_TAB,
    ENTER_MNEMONIC_OR_PRIVATE_KEY_TAB,
}

const ImportWalletModal = createModal((props: ExposedBackdropProps) => {
    const [index, setIndex] = useState(ImportWalletModalTabs.CHOOSE_MNEMONIC_OR_PRIVATE_KEY_TAB);
    const {
        state: { importWithPrivateKey },
    } = useCreateWallet();
    const translate = useTranslate();

    return (
        <AddWalletModal imported title={translate("import_wallet")} onBack={index ? () => setIndex((i) => i - 1) : undefined} {...props}>
            {(handleWalletCreation) => (
                <Tabs index={index} onIndexChange={setIndex}>
                    <TabPanel index={ImportWalletModalTabs.CHOOSE_MNEMONIC_OR_PRIVATE_KEY_TAB}>
                        <SelectMnemonicOrPrivateKeyScreen
                            onSubmit={() => setIndex(ImportWalletModalTabs.ENTER_MNEMONIC_OR_PRIVATE_KEY_TAB)}
                        />
                    </TabPanel>
                    <TabPanel index={ImportWalletModalTabs.ENTER_MNEMONIC_OR_PRIVATE_KEY_TAB}>
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
