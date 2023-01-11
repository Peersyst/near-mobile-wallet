import { createBackdrop, ExposedBackdropProps, TabPanel, Tabs } from "@peersyst/react-native-components";
import { useState } from "react";
import { useResetRecoilState } from "recoil";
import sendState from "module/transaction/state/SendState";
import SendConfirmationScreen from "module/transaction/screen/SendConfirmationScreen/SendConfirmationScreen";
import SendSetAmountScreen from "module/transaction/screen/SendSetAmountScreen/SendSetAmountScreen";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import GetTitleStep from "./getTitleStep";
import SetAmountStakeScreen from "module/staking/screen/SetAmountStakeScreen/SetAmountStakeScreen";

export enum SendScreens {
    SET_AMOUNT,
    AMOUNT_AND_MESSAGE,
    CONFIRMATION,
}

const AddStakeModal = createBackdrop(({ onExited, ...rest }: ExposedBackdropProps) => {
    const [activeIndex, setActiveIndex] = useState(SendScreens.SET_AMOUNT);
    const resetSendState = useResetRecoilState(sendState);
    const handleExited = () => {
        onExited?.();
        resetSendState();
    };

    return (
        <CardNavigatorModal
            navbar={{
                back: true,
                title: GetTitleStep(activeIndex),
                onBack: activeIndex > 0 ? () => setActiveIndex((oldIndex) => oldIndex - 1) : undefined,
                steps: {
                    length: 4,
                    index: activeIndex,
                },
            }}
            onExited={handleExited}
            {...rest}
        >
            <Tabs index={activeIndex} onIndexChange={setActiveIndex}>
                <TabPanel index={SendScreens.SET_AMOUNT}>
                    <SetAmountStakeScreen />
                </TabPanel>
            </Tabs>
        </CardNavigatorModal>
    );
});

export default AddStakeModal;
