import { createModal, ExposedBackdropProps, TabPanel, Tabs } from "@peersyst/react-native-components";
import { useState } from "react";
import AddWalletModal from "module/wallet/component/core/AddWalletModal/AddWalletModal";
import EnterWalletMnemonicScreen from "module/wallet/screen/EnterWalletMnemonicScreen";
import { useTranslate } from "module/common/hook/useTranslate";
import SelectMnemonicOrPrivateKeyScreen from "module/wallet/screen/SelectMnemonicOrPrivateKeyScreen/SelectMnemonicOrPrivateKeyScreen";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import EnterPrivateKeyScreen from "module/wallet/screen/EnterPrivateKeyScreen/EnterPrivateKeyScreen";
import useImportWalletModal from "./hook/useImportWalletModal";

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

    const { handleWalletCreation } = useImportWalletModal();

    return (
        <AddWalletModal
            navbar={{
                title: translate("import_wallet")!.toLocaleUpperCase(),
                onBack: index !== 0 ? () => setIndex((i) => i - 1) : undefined,
                back: true,
            }}
            {...props}
        >
            <Tabs index={index} onIndexChange={setIndex}>
                <TabPanel index={ImportWalletModalTabs.CHOOSE_MNEMONIC_OR_PRIVATE_KEY_TAB}>
                    <SelectMnemonicOrPrivateKeyScreen onSubmit={() => setIndex(ImportWalletModalTabs.ENTER_MNEMONIC_OR_PRIVATE_KEY_TAB)} />
                </TabPanel>
                <TabPanel index={ImportWalletModalTabs.ENTER_MNEMONIC_OR_PRIVATE_KEY_TAB}>
                    {importWithPrivateKey ? (
                        <EnterPrivateKeyScreen onSubmit={handleWalletCreation} submitText={translate("import_wallet")} />
                    ) : (
                        <EnterWalletMnemonicScreen onSubmit={handleWalletCreation} submitText={translate("import_wallet")} />
                    )}
                </TabPanel>
            </Tabs>
        </AddWalletModal>
    );
});

export default ImportWalletModal;
