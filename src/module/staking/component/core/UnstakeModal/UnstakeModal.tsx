import { createModal, ExposedBackdropProps } from "@peersyst/react-native-components";
import SelectValidatorScreen from "module/staking/screen/SelectValidatorScreen/SelectValidatorScreen";
import BaseStakeModal, { ModalSteps } from "module/staking/component/core/BaseStakeModal/BaseStakeModal";
import SetAmountStakeScreen from "module/staking/screen/SetAmountStakeScreen/SetAmountStakeScreen";

export enum UnstakeModalScreens {
    SELECT_VALIDATOR,
    SET_AMOUNT,
    CONFIRM_VALIDATOR,
}

const UnstakeModal = createModal(({ ...rest }: ExposedBackdropProps): JSX.Element => {
    const unstakeModalSteps: ModalSteps[] = [
        {
            title: "select_validator",
            tabId: UnstakeModalScreens.SELECT_VALIDATOR,
            tabContent: <SelectValidatorScreen />,
        },
        {
            title: "unstake_your_near",
            tabId: UnstakeModalScreens.SET_AMOUNT,
            tabContent: <SetAmountStakeScreen />,
        },
    ];

    return <BaseStakeModal modalSteps={unstakeModalSteps} {...rest} />;
});

export default UnstakeModal;
