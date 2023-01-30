import { createModal, ExposedBackdropProps, TabPanel, Tabs } from "@peersyst/react-native-components";
import AddWalletModal from "module/wallet/component/core/AddWalletModal/AddWalletModal";
import { useTranslate } from "module/common/hook/useTranslate";
import AddCustomNameWarning from "module/wallet/screen/AddCustomNameWarning/AddCustomNameWarning";
import SetAccountNameScreen from "module/wallet/screen/SetAccountNameScreen/SetAccountNameScreen";
import SelectFundingAccountScreen from "module/wallet/screen/SelectFundingAccountScreen/SelectFundingAccountScreen";
import CreateAccountConfirmationScreen from "module/wallet/screen/CreateAccountConfirmScreen/CreateAccountConfirmationScreen";
import CreateAccountSuccessScreen from "module/wallet/screen/CreateAccountSuccessScreen/CreateAccountSuccessScreen";
import { TransaltionResourceType } from "locale";
import { useCreateWalletModal } from "./hook/useCreateWalletModal";

export const LOCALE_MODAL_TITLES: TransaltionResourceType[] = [
    "add_a_custom_address",
    "select_funding_acc",
    "add_a_custom_address",
    "confirm",
    "success",
];

export enum CreateWalletModalTabs {
    WARNING_TAB,
    SET_FUNDING_ACC_TAB,
    SET_ACCOUNT_NAME_TAB,
    CONFIRM_TAB,
    SUCCESS_TAB,
}

const CreateWalletModal = createModal((props: ExposedBackdropProps) => {
    const translate = useTranslate();
    const { index, setIndex, handleOnBack, handleClose, handleWalletCreation } = useCreateWalletModal();

    return (
        <AddWalletModal
            navbar={{
                back: index !== LOCALE_MODAL_TITLES.length - 1,
                title: translate(LOCALE_MODAL_TITLES[index])!,
                onBack: index > 0 ? handleOnBack : undefined,
                steps:
                    index !== 0 && index !== 4
                        ? {
                              index: index - 1,
                              length: 3,
                          }
                        : undefined,
            }}
            {...props}
        >
            <Tabs index={index} onIndexChange={setIndex}>
                <TabPanel index={CreateWalletModalTabs.WARNING_TAB}>
                    <AddCustomNameWarning onSubmit={() => setIndex(CreateWalletModalTabs.SET_FUNDING_ACC_TAB)} />
                </TabPanel>
                <TabPanel index={CreateWalletModalTabs.SET_FUNDING_ACC_TAB}>
                    <SelectFundingAccountScreen onSubmit={() => setIndex(CreateWalletModalTabs.SET_ACCOUNT_NAME_TAB)} />
                </TabPanel>
                <TabPanel index={CreateWalletModalTabs.SET_ACCOUNT_NAME_TAB}>
                    <SetAccountNameScreen onSubmit={() => setIndex(CreateWalletModalTabs.CONFIRM_TAB)} />
                </TabPanel>
                <TabPanel index={CreateWalletModalTabs.CONFIRM_TAB}>
                    <CreateAccountConfirmationScreen
                        onSubmit={handleWalletCreation}
                        onSuccess={() => setIndex(CreateWalletModalTabs.SUCCESS_TAB)}
                        onCancel={handleClose}
                    />
                </TabPanel>
                <TabPanel index={CreateWalletModalTabs.SUCCESS_TAB}>
                    <CreateAccountSuccessScreen onSubmit={handleClose} />
                </TabPanel>
            </Tabs>
        </AddWalletModal>
    );
});

export default CreateWalletModal;
