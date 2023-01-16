import { createBackdrop, ExposedBackdropProps } from "@peersyst/react-native-components";
import SetAmountStakeScreen from "module/staking/screen/SetAmountStakeScreen/SetAmountStakeScreen";
import { useTranslate } from "module/common/hook/useTranslate";
import StakeModal from "../StakeModal/StakeModal";
import { MainTabItemType } from "module/main/component/navigation/MainTabs/MainTabs.types";

export enum SendScreens {
    SET_AMOUNT,
}

const AddStakeModal = createBackdrop((props: ExposedBackdropProps) => {
    const translate = useTranslate();

    const tabs: MainTabItemType[] = [
        {
            item: <SetAmountStakeScreen />,
            title: translate("stake_your_near"),
        },
        {
            item: <></>,
            title: translate("select_validator"),
        },
        {
            item: <></>,
            title: translate("confirm_validator"),
        },
        {
            item: <></>,
            title: translate("success"),
        },
    ];
    return <StakeModal tabs={tabs} {...props} />;
});

export default AddStakeModal;
