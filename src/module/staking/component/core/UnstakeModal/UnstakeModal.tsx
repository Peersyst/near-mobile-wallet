import { createModal, ExposedBackdropProps } from "@peersyst/react-native-components";
import StakeModal, { ModalTabs } from "module/staking/component/core/StakeModal/StakeModal";
import { useTranslate } from "module/common/hook/useTranslate";
import UnstakeSelectValidatorScreen from "module/staking/screen/SelectValidatorScreen/UnstakeSelectValidatorScreen/UnstakeSelectValidatorScreen";
import UnstakeSetAmountScreen from "module/staking/screen/BaseSetAmountStakeScreen/UnstakeSetAmountScreen/UnstakeSetAmountScreen";

export enum UnstakeModalScreens {
    SELECT_VALIDATOR,
    SET_AMOUNT,
    CONFIRM_VALIDATOR,
}

const UnstakeModal = createModal(({ ...rest }: ExposedBackdropProps): JSX.Element => {
    const translate = useTranslate();

    const unstakeModalTabs: ModalTabs[] = [
        {
            title: translate("select_validator"),
            tabIndex: UnstakeModalScreens.SELECT_VALIDATOR,
            tabContent: <UnstakeSelectValidatorScreen />,
        },
        {
            title: translate("unstake_your_near"),
            tabIndex: UnstakeModalScreens.SET_AMOUNT,
            tabContent: <UnstakeSetAmountScreen />,
        },
    ];

    return <StakeModal tabs={unstakeModalTabs} {...rest} />;
});

export default UnstakeModal;
