import { createBackdrop, ExposedBackdropProps } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import StakeModal, { ModalTabs } from "../StakeModal/StakeModal";
import AddStakeValidatorScreen from "module/staking/screen/SelectValidatorScreen/AddStakeSelectValidatorScreen/AddStakeSelectValidatorScreen";
import AddStakeSetAmountScreen from "module/staking/screen/SetAmountScreen/AddStakeSetAmountScreen/AddStakeSetAmountScreen";
import AddStakeSuccessScreen from "module/staking/screen/SuccessScreen/AddStakeSuccessScreen/AddStakeSuccessScreen";
import AddStakeConfirmScreen from "module/staking/screen/ConfirmScreen/AddStakeConfirmScreen/AddStakeConfirmScreen";

export enum AddStakeScreens {
    SET_AMOUNT,
    SELECT_VALIDATOR,
    CONFIRM_VALIDATOR,
    SUCCESS,
}

const AddStakeModal = createBackdrop((props: ExposedBackdropProps) => {
    const translate = useTranslate();

    const tabs: ModalTabs[] = [
        {
            title: translate("stake_your_near"),
            tabIndex: AddStakeScreens.SET_AMOUNT,
            tabContent: <AddStakeSetAmountScreen />,
        },
        {
            title: translate("select_validator"),
            tabIndex: AddStakeScreens.SELECT_VALIDATOR,
            tabContent: <AddStakeValidatorScreen />,
        },
        {
            tabContent: <AddStakeConfirmScreen />,
            title: translate("confirm_validator"),
            tabIndex: AddStakeScreens.CONFIRM_VALIDATOR,
        },
        {
            tabContent: <AddStakeSuccessScreen />,
            title: translate("success"),
            tabIndex: AddStakeScreens.SUCCESS,
        },
    ];
    return <StakeModal tabs={tabs} {...props} />;
});

export default AddStakeModal;
