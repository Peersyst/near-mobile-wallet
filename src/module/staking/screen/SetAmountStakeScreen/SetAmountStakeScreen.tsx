import { useSetTab } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import BaseSetAmountStakeScreen from "../BaseSetAmountStakeScreen/BaseSetAmountStakeScreen";
import { AddStakeScreens } from "module/staking/component/core/AddStakeModal/AddStakeModal";

export interface SendForm {
    amount: string;
}

const SetAmountStakeScreen = () => {
    const translate = useTranslate();

    const setTab = useSetTab();

    const handleSubmit = () => setTab(AddStakeScreens.SELECT_VALIDATOR);

    return <BaseSetAmountStakeScreen label={translate("enter_amount_want_to_stake")!} onSubmit={handleSubmit} />;
};

export default SetAmountStakeScreen;
