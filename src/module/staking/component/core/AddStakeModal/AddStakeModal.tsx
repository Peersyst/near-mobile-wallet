import { createBackdrop, ExposedBackdropProps } from "@peersyst/react-native-components";
import SetAmountStakeScreen from "module/staking/screen/SetAmountStakeScreen/SetAmountStakeScreen";
import { useTranslate } from "module/common/hook/useTranslate";
import StakeModal, { ModalTabs } from "../StakeModal/StakeModal";

export enum AddStakeScreens {
    SET_AMOUNT,
    SELECT_VALIDATOR,
}

const AddStakeModal = createBackdrop((props: ExposedBackdropProps) => {
    const translate = useTranslate();

    const tabs: ModalTabs[] = [
        {
            tabContent: <SetAmountStakeScreen />,
            title: translate("stake_your_near"),
            tabIndex: AddStakeScreens.SET_AMOUNT,
        },
        {
            tabContent: <></>,
            title: translate("select_validator"),
            tabIndex: AddStakeScreens.SELECT_VALIDATOR,
        },
        {
            tabContent: <></>,
            title: translate("confirm_validator"),
            tabIndex: 2,
        },
        {
            tabContent: <></>,
            title: translate("success"),
            tabIndex: 3,
        },
    ];
    return <StakeModal tabs={tabs} {...props} />;
});

export default AddStakeModal;
