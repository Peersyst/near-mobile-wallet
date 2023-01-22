import SelectValidatorScreen from "module/staking/screen/SelectValidatorScreen/SelectValidatorScreen";
import { useTranslate } from "module/common/hook/useTranslate";
import { useSetTab } from "@peersyst/react-native-components";
import { WithdrawModalScreens } from "module/staking/component/core/WithdrawModal/WithdrawModal";
import useGetWithdrawValidators from "module/staking/hook/useGetWithdrawValidators";

const WithdrawSelectValidatorScreen = (): JSX.Element => {
    const translate = useTranslate();
    const setTab = useSetTab();

    const { validators, isLoading } = useGetWithdrawValidators();

    return (
        <SelectValidatorScreen
            message={translate("select_validator_withdrawal")}
            validators={validators}
            loading={isLoading}
            onSelected={() => setTab(WithdrawModalScreens.CONFIRM_VALIDATOR)}
        />
    );
};

export default WithdrawSelectValidatorScreen;
