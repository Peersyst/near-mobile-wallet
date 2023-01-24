import { useTranslate } from "module/common/hook/useTranslate";
import { useSetTab } from "@peersyst/react-native-components";
import { WithdrawModalScreens } from "module/staking/component/core/WithdrawModal/WithdrawModal";
import useGetWithdrawValidators from "module/staking/hook/useGetWithdrawValidators";
import StakingSelectValidatorScreen from "../StakingSelectValidatorScreen";

const WithdrawSelectValidatorScreen = (): JSX.Element => {
    const translate = useTranslate();
    const setTab = useSetTab();
    const { validators, isLoading } = useGetWithdrawValidators();

    return (
        <StakingSelectValidatorScreen
            message={translate("select_validator_withdrawal")}
            validators={validators}
            loading={isLoading}
            onSelected={() => setTab(WithdrawModalScreens.CONFIRM_VALIDATOR)}
            useAvailableToAmount={true}
            stakingBalanceType="available"
        />
    );
};

export default WithdrawSelectValidatorScreen;
