import useTranslate from "module/common/hook/useTranslate";
import { useSetTab } from "@peersyst/react-native-components";
import useGetWithdrawValidators from "module/staking/hook/useGetWithdrawValidators";
import StakingSelectValidatorScreen from "module/staking/screen/SelectValidatorScreen/StakingSelectValidatorScreen";
import { WithdrawModalScreens } from "module/staking/component/core/WithdrawModal/WithdrawModal.types";

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
            setAvailableAsAmount={true}
            stakingBalanceType="available"
        />
    );
};

export default WithdrawSelectValidatorScreen;
