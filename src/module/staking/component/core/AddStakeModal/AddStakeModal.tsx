import { createBackdrop, ExposedBackdropProps, TabPanel, Tabs } from "@peersyst/react-native-components";
import { useState } from "react";
import { useResetRecoilState } from "recoil";
import sendState from "module/transaction/state/SendState";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import SetAmountStakeScreen from "module/staking/screen/SetAmountStakeScreen/SetAmountStakeScreen";
import { useTranslate } from "module/common/hook/useTranslate";
import { TransaltionResourceType } from "locale";

export enum SendScreens {
    SET_AMOUNT,
}

const AddStakeModal = createBackdrop(({ onExited, ...rest }: ExposedBackdropProps) => {
    const [activeIndex, setActiveIndex] = useState(SendScreens.SET_AMOUNT);
    const resetSendState = useResetRecoilState(sendState);

    const handleExited = () => {
        onExited?.();
        resetSendState();
    };

    const translate = useTranslate();
    const ADD_STAKE_MODAL_TITLES: TransaltionResourceType[] = ["stake_your_near", "select_validator", "confirm_validator", "success"];

    return (
        <CardNavigatorModal
            navbar={{
                back: true,
                title: translate(ADD_STAKE_MODAL_TITLES[Number(activeIndex)])!,
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
