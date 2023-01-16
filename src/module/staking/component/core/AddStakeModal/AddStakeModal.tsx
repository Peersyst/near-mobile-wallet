import { createBackdrop, ExposedBackdropProps, Label, TabPanel, Tabs } from "@peersyst/react-native-components";
import { useState } from "react";
import { useResetRecoilState } from "recoil";
import sendState from "module/transaction/state/SendState";
import SetAmountStakeScreen from "module/staking/screen/SetAmountStakeScreen/SetAmountStakeScreen";
import { useTranslate } from "module/common/hook/useTranslate";
import { TransaltionResourceType } from "locale";
import SelectValidatorScreen from "module/staking/screen/SelectValidatorScreen/SelectValidatorScreen";
import { AddStakeModalRoot } from "./AddStakeModal.styles";
import SuccessScreen from "module/staking/screen/SuccessScreen/SuccessScreen";

export enum SendScreens {
    SUCCESS,
    SET_AMOUNT,
    SELECT_VALIDATOR,
    CONFIRM_VALIDATOR,
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
        <AddStakeModalRoot
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
                <TabPanel index={SendScreens.SUCCESS}>
                    <SuccessScreen onClose={onExited} />
                </TabPanel>
                <TabPanel index={SendScreens.SET_AMOUNT}>
                    <SetAmountStakeScreen />
                </TabPanel>
                <TabPanel index={SendScreens.SELECT_VALIDATOR}>
                    <SelectValidatorScreen />
                </TabPanel>
                <TabPanel index={SendScreens.CONFIRM_VALIDATOR}>
                    <Label label={"confirm"}></Label>
                </TabPanel>
            </Tabs>
        </AddStakeModalRoot>
    );
});

export default AddStakeModal;