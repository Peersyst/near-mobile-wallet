import StakeModal, { ModalTabs } from "module/staking/component/core/StakeModal/StakeModal";
import { useTranslate } from "module/common/hook/useTranslate";
import { createBackdrop, ExposedBackdropProps } from "@peersyst/react-native-components";
import WithdrawSelectValidatorScreen from "module/staking/screen/SelectValidatorScreen/WithdrawSelectValidatorScreen/WithdrawSelectValidatorScreen";
import WithdrawConfirmScreen from "module/staking/screen/ConfirmScreen/WithdrawConfirmScreen/WithdrawConfirmScreen";
import WithdrawSuccessScreen from "module/staking/screen/SuccessScreen/WithdrawSuccessScreen/WithdrawSuccessScreen";

export enum WithdrawModalScreens {
    SELECT_VALIDATOR,
    CONFIRM_VALIDATOR,
    SUCCESS,
}

const WithdrawModal = createBackdrop(({ ...rest }: ExposedBackdropProps): JSX.Element => {
    const translate = useTranslate();

    const withdrawTabs: ModalTabs[] = [
        {
            title: translate("select_validator"),
            tabIndex: WithdrawModalScreens.SELECT_VALIDATOR,
            tabContent: <WithdrawSelectValidatorScreen />,
        },
        {
            title: translate("confirm_validator"),
            tabIndex: WithdrawModalScreens.CONFIRM_VALIDATOR,
            tabContent: <WithdrawConfirmScreen />,
        },
        {
            title: translate("success"),
            tabIndex: WithdrawModalScreens.SUCCESS,
            tabContent: <WithdrawSuccessScreen />,
        },
    ];

    return <StakeModal tabs={withdrawTabs} {...rest} />;
});

export default WithdrawModal;
