import { createModal, ExposedBackdropProps, TabPanel, Tabs } from "@peersyst/react-native-components";
import PickWalletMnemonicScreen from "module/wallet/screen/PickWalletMnemonicScreen/PickWalletMnemonicScreen";
import { useState } from "react";
import AddWalletModal from "module/wallet/component/core/AddWalletModal/AddWalletModal";
import { useTranslate } from "module/common/hook/useTranslate";
import AddCustomNameWarning from "module/wallet/screen/AddCustomNameWarning/AddCustomNameWarning";
import SetAccountNameScreen from "module/wallet/screen/SetAccountNameScreen/SetAccountNameScreen";
import SelectFundingAccount from "module/wallet/screen/SelectFundingAccount/SelectFundingAccount";
import CreateAccountConfirmationScreen from "module/wallet/screen/CreateAccountConfirmScreen/CreateAccountConfirmationScreen";
import CreateWalletSuccessScreen from "module/wallet/screen/CreateWalletSuccessScreen";
import CreateAccountSuccessScreen from "module/wallet/screen/CreateAccountSuccessScreen/CreateAccountSuccessScreen";

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
            {(handleWalletCreation, handleClose) => (
                <Tabs index={index} onIndexChange={setIndex}>
                    <TabPanel index={0}>
                        <AddCustomNameWarning onSubmit={() => setIndex(1)} />
                    </TabPanel>
                    <TabPanel index={1}>
                        <SetAccountNameScreen onSubmit={() => setIndex(2)} />
                    </TabPanel>
                    <TabPanel index={2}>
                        <SelectFundingAccount onSubmit={() => setIndex(3)} />
                    </TabPanel>
                    <TabPanel index={3}>
                        <CreateAccountConfirmationScreen onSubmit={() => setIndex(4)} onCancel={handleClose} />
                    </TabPanel>
                    <TabPanel index={4}>
                        <CreateAccountSuccessScreen />
                    </TabPanel>
                </Tabs>
            )}
        </AddWalletModal>
    );
});

export default CreateWalletModal;
