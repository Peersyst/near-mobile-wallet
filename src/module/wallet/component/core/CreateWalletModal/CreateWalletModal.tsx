import { createModal, ExposedBackdropProps, TabPanel, Tabs } from "@peersyst/react-native-components";
import { useState } from "react";
import AddWalletModal from "module/wallet/component/core/AddWalletModal/AddWalletModal";
import { useTranslate } from "module/common/hook/useTranslate";
import AddCustomNameWarning from "module/wallet/screen/AddCustomNameWarning/AddCustomNameWarning";
import SetAccountNameScreen from "module/wallet/screen/SetAccountNameScreen/SetAccountNameScreen";
import SelectFundingAccountScreen from "module/wallet/screen/SelectFundingAccountScreen/SelectFundingAccountScreen";
import CreateAccountConfirmationScreen from "module/wallet/screen/CreateAccountConfirmScreen/CreateAccountConfirmationScreen";
import CreateAccountSuccessScreen from "module/wallet/screen/CreateAccountSuccessScreen/CreateAccountSuccessScreen";
import { TransaltionResourceType } from "locale";

export const LOCALE_MODAL_TITLES: TransaltionResourceType[] = [
    "add_a_custom_address",
    "add_a_custom_address",
    "select_funding_acc",
    "confirm",
    "success",
];

export enum CreateWalletModalTabs {
    WARNING_TAB,
    SET_ACCOUNT_NAME_TAB,
    SET_FUNDING_ACC_TAB,
    CONFIRM_TAB,
    SUCCESS_TAB,
}

const CreateWalletModal = createModal((props: ExposedBackdropProps) => {
    const [index, setIndex] = useState(CreateWalletModalTabs.WARNING_TAB);
    const translate = useTranslate();
    const handleOnBack = () => {
        if (index !== 0) {
            setIndex((i) => i - 1);
        }
    };

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
            title={translate(LOCALE_MODAL_TITLES[index])}
            onBack={handleOnBack}
            closeOnWalletCreation={false}
            {...props}
        >
            {(handleWalletCreation, handleClose) => (
                <Tabs index={index} onIndexChange={setIndex}>
                    <TabPanel index={0}>
                        <AddCustomNameWarning onSubmit={() => setIndex(CreateWalletModalTabs.SET_ACCOUNT_NAME_TAB)} />
                    </TabPanel>
                    <TabPanel index={1}>
                        <SetAccountNameScreen onSubmit={() => setIndex(CreateWalletModalTabs.SET_FUNDING_ACC_TAB)} />
                    </TabPanel>
                    <TabPanel index={2}>
                        <SelectFundingAccountScreen onSubmit={() => setIndex(CreateWalletModalTabs.CONFIRM_TAB)} />
                    </TabPanel>
                    <TabPanel index={3}>
                        <CreateAccountConfirmationScreen
                            onSubmit={handleWalletCreation}
                            onSuccess={() => setIndex(CreateWalletModalTabs.SUCCESS_TAB)}
                            onCancel={handleClose}
                        />
                    </TabPanel>
                    <TabPanel index={4}>
                        <CreateAccountSuccessScreen onSubmit={handleClose} />
                    </TabPanel>
                </Tabs>
            )}
        </AddWalletModal>
    );
});

export default CreateWalletModal;
