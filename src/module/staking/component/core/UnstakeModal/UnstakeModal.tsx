import { createModal, ExposedBackdropProps } from "@peersyst/react-native-components";
import StakeModal, { ModalTabs } from "module/staking/component/core/StakeModal/StakeModal";
import { useTranslate } from "module/common/hook/useTranslate";
import SetAmountStakeScreen from "module/staking/screen/SetAmountStakeScreen/SetAmountStakeScreen";
import UnstakeValidatorScreen from "module/staking/screen/SelectValidatorScreen/UnstakeValidatorScreen/UnstakeValidatorScreen";

export enum UnstakeModalScreens {
    SELECT_VALIDATOR,
    SET_AMOUNT,
}

const UnstakeModal = createModal(({ ...rest }: ExposedBackdropProps): JSX.Element => {
    const translate = useTranslate();

    const unstakeModalTabs: ModalTabs[] = [
        {
            title: translate("select_validator"),
            tabIndex: UnstakeModalScreens.SELECT_VALIDATOR,
            tabContent: <UnstakeValidatorScreen />,
        },
        {
            title: translate("unstake_your_near"),
            tabIndex: UnstakeModalScreens.SET_AMOUNT,
            tabContent: <SetAmountStakeScreen />,
        },
    ];

    return <StakeModal tabs={unstakeModalTabs} {...rest} />;
});

export default UnstakeModal;
