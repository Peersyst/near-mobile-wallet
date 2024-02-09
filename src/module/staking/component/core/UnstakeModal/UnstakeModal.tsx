import { createBackdrop, ExposedBackdropProps } from "@peersyst/react-native-components";
import StakeModal, { ModalTabs } from "module/staking/component/core/StakeModal/StakeModal";
import useTranslate from "module/common/hook/useTranslate";
import UnstakeSelectValidatorScreen from "module/staking/screen/SelectValidatorScreen/UnstakeSelectValidatorScreen/UnstakeSelectValidatorScreen";
import UnstakeConfirmScreen from "module/staking/screen/ConfirmScreen/UnstakeConfirmScreen/UnstakeConfirmScreen";
import UnstakeSuccessScreen from "module/staking/screen/SuccessScreen/UnstakeSuccessScreen/UnstakeSuccessScreen";
import UnstakeSetAmountScreen from "module/staking/screen/SetAmountScreen/UnstakeSetAmountScreen/UnstakeSetAmountScreen";

export enum UnstakeModalScreens {
    SELECT_VALIDATOR,
    SET_AMOUNT,
    CONFIRM_VALIDATOR,
    SUCCESS,
}

const UnstakeModal = createBackdrop(({ ...rest }: ExposedBackdropProps): JSX.Element => {
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
        {
            title: translate("confirm_validator"),
            tabIndex: UnstakeModalScreens.CONFIRM_VALIDATOR,
            tabContent: <UnstakeConfirmScreen />,
        },
        {
            title: translate("success"),
            tabIndex: UnstakeModalScreens.SUCCESS,
            tabContent: <UnstakeSuccessScreen />,
        },
    ];

    return <StakeModal tabs={unstakeModalTabs} {...rest} />;
});

export default UnstakeModal;
