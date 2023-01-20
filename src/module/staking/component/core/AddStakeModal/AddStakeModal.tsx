import { createBackdrop, ExposedBackdropProps } from "@peersyst/react-native-components";
import SetAmountStakeScreen from "module/staking/screen/BaseSetAmountStakeScreen/AddStakeSetAmountScreen/AddStakeSetAmountScreen";
import { useTranslate } from "module/common/hook/useTranslate";
import StakeModal, { ModalTabs } from "../StakeModal/StakeModal";
import AddStakeValidatorScreen from "module/staking/screen/SelectValidatorScreen/AddStakeSelectValidatorScreen/AddStakeSelectValidatorScreen";
import AddStakingScreen from "module/staking/screen/AddStakeScreen/AddStakeScreen";

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
            tabContent: <SetAmountStakeScreen />,
        },
        {
            title: translate("select_validator"),
            tabIndex: AddStakeScreens.SELECT_VALIDATOR,
            tabContent: <AddStakeValidatorScreen />,
        },
        {
            tabContent: <AddStakingScreen />,
            title: translate("confirm_validator"),
            tabIndex: AddStakeScreens.CONFIRM_VALIDATOR,
        },
        {
            tabContent: <></>,
            title: translate("success"),
            tabIndex: AddStakeScreens.SUCCESS,
        },
    ];
    return <StakeModal tabs={tabs} {...props} />;
});

export default AddStakeModal;
