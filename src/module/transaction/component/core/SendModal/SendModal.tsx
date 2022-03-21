import { BackdropProps, createBackdrop, TabPanel, Tabs } from "react-native-components";
import SendToAddressScreen from "module/transaction/screen/SendToAddressScreen/SendToAddressScreen";
import { translate } from "locale";
import { useState } from "react";
import GlassNavigatorModal from "module/common/component/navigation/GlassNavigatorModal/GlassNavigatorModal";
import SendAmountAndMessageScreen from "module/transaction/screen/SendAmountAndMessageScreen";
import useGetFee from "module/transaction/query/useGetFee";
import { useRecoilValue, useResetRecoilState } from "recoil";
import settingsState from "module/settings/state/SettingsState";
import sendState from "module/transaction/state/SendState";

export enum SendScreens {
    SEND_TO_ADDRESS,
    AMOUNT_AND_MESSAGE,
}

const SendModal = createBackdrop(({ onClose, ...rest }: BackdropProps) => {
    const [activeIndex, setActiveIndex] = useState(SendScreens.SEND_TO_ADDRESS);
    const { fee } = useRecoilValue(settingsState);
    const resetSendState = useResetRecoilState(sendState);

    // Prefetch fee
    useGetFee(fee);

    const handleClose = () => {
        resetSendState();
        onClose?.();
    };

    return (
        <GlassNavigatorModal
            breadcrumbs={{ length: 3, index: activeIndex }}
            navbar={{
                back: true,
                title: translate("send"),
                onBack: activeIndex > 0 ? () => setActiveIndex((oldIndex) => oldIndex - 1) : undefined,
            }}
            onClose={handleClose}
            {...rest}
        >
            <Tabs index={activeIndex} onIndexChange={setActiveIndex}>
                <TabPanel index={SendScreens.SEND_TO_ADDRESS}>
                    <SendToAddressScreen />
                </TabPanel>
                <TabPanel index={SendScreens.AMOUNT_AND_MESSAGE}>
                    <SendAmountAndMessageScreen />
                </TabPanel>
            </Tabs>
        </GlassNavigatorModal>
    );
});

export default SendModal;
