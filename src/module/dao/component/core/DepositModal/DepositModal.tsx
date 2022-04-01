import { createBackdrop, ExposedBackdropProps, TabPanel, Tabs } from "react-native-components";
import { translate } from "locale";
import { useState } from "react";
import GlassNavigatorModal from "module/common/component/navigation/GlassNavigatorModal/GlassNavigatorModal";
import useGetFee from "module/transaction/query/useGetFee";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import settingsState from "module/settings/state/SettingsState";
import sendState from "module/transaction/state/SendState";
import SendConfirmationScreen from "module/transaction/screen/SendConfirmationScreen/SendConfirmationScreen";
import DepositSelectAccountScreen from "module/dao/screen/DepositSelectAccountScreen/DepositSelectAccountScreen";
import SendAmountAndMessageScreen from "module/transaction/screen/SendAmountAndMessageScreen/SendAmountAndMessageScreen";
import DepositConfirmationScreen from "module/dao/screen/DepositConfirmationScreen/DepositConfirmationScreen";

export enum SendScreens {
    SELECT_ACCOUNT,
    AMOUNT_AND_MESSAGE,
    CONFIRMATION,
}

const DepositModal = createBackdrop(({ onExited, ...rest }: ExposedBackdropProps) => {
    const [activeIndex, setActiveIndex] = useState(SendScreens.SELECT_ACCOUNT);
    const { fee } = useRecoilValue(settingsState);
    const resetSendState = useResetRecoilState(sendState);
    const setSendState = useSetRecoilState(sendState);

    const handleExited = () => {
        onExited?.();
        resetSendState();
    };

    const startDeposit = () => {
        // Prefetch fee
        useGetFee(fee);
        //Set DAO address as a receiver address
        setSendState((oldState) => ({ ...oldState, receiverAddress: "0x0" }));
    };

    return (
        <GlassNavigatorModal
            breadcrumbs={{ length: 3, index: activeIndex }}
            navbar={{
                back: true,
                title: translate("deposit"),
                onBack: activeIndex > 0 ? () => setActiveIndex((oldIndex) => oldIndex - 1) : undefined,
            }}
            onEntered={startDeposit}
            onExited={handleExited}
            {...rest}
        >
            <Tabs index={activeIndex} onIndexChange={setActiveIndex}>
                <TabPanel index={SendScreens.SELECT_ACCOUNT}>
                    <DepositSelectAccountScreen />
                </TabPanel>
                <TabPanel index={SendScreens.AMOUNT_AND_MESSAGE}>
                    <SendAmountAndMessageScreen isDaoDeposit />
                </TabPanel>
                <TabPanel index={SendScreens.CONFIRMATION}>
                    <DepositConfirmationScreen />
                </TabPanel>
            </Tabs>
        </GlassNavigatorModal>
    );
});

export default DepositModal;
