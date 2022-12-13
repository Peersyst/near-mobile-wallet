import { createModal, ExposedBackdropProps, TabPanel, Tabs } from "@peersyst/react-native-components";
import PickWalletMnemonicScreen from "module/wallet/screen/PickWalletMnemonicScreen/PickWalletMnemonicScreen";
import { useState } from "react";
import AddWalletModal from "module/wallet/component/core/AddWalletModal/AddWalletModal";
import { useTranslate } from "module/common/hook/useTranslate";
import AddCustomNameWarning from "module/wallet/screen/AddCustomNameWarning/AddCustomNameWarning";
import SetAccountNameScreen from "module/wallet/screen/SetAccountNameScreen/SetAccountNameScreen";
import SelectFundingAccount from "module/wallet/screen/SelectFundingAccount/SelectFundingAccount";

const CreateWalletModal = createModal((props: ExposedBackdropProps) => {
    const [index, setIndex] = useState(0);
    const translate = useTranslate();
    return (
        <AddWalletModal
            steps={
                index !== 0 && index !== 4
                    ? {
                          index: index - 1,
                          length: 3,
                      }
                    : undefined
            }
            title={translate("create_wallet")}
            onBack={index ? () => setIndex((i) => i - 1) : undefined}
            {...props}
        >
            {(handleWalletCreation) => (
                <Tabs index={index} onIndexChange={setIndex}>
                    <TabPanel index={0}>
                        <AddCustomNameWarning submitText={translate("continue")} onSubmit={() => setIndex(1)} />
                    </TabPanel>
                    <TabPanel index={1}>
                        <SetAccountNameScreen onSubmit={() => setIndex(2)} submitText={translate("continue")} />
                    </TabPanel>
                    <TabPanel index={2}>
                        <SelectFundingAccount onSubmit={() => setIndex(3)} submitText={translate("continue")} />
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
