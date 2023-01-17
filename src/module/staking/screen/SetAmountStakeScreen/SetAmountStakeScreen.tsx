import { useSetTab } from "@peersyst/react-native-components";
import { SendScreens } from "module/transaction/component/core/SendModal/SendModal";
import { useTranslate } from "module/common/hook/useTranslate";
import BaseSetAmountStakeScreen from "../BaseSetAmountStakeScreen/BaseSetAmountStakeScreen";

export interface SendForm {
    amount: string;
}

const SetAmountStakeScreen = () => {
    const translate = useTranslate();

    const setTab = useSetTab();

    const handleSubmit = () => setTab(SendScreens.AMOUNT_AND_MESSAGE);

    return <BaseSetAmountStakeScreen label={translate("enter_amount_want_to_stake")!} onSubmit={handleSubmit} />;
};

export default SetAmountStakeScreen;
