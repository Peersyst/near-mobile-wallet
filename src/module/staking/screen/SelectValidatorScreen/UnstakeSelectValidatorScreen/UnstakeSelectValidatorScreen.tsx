import { UnstakeModalScreens } from "module/staking/component/core/UnstakeModal/UnstakeModal";
import useTranslate from "module/common/hook/useTranslate";
import { useSetTab } from "@peersyst/react-native-components";
import useGetStakingValidators from "module/staking/hook/useGetStakingValidators";
import StakingSelectValidatorScreen from "../StakingSelectValidatorScreen";

const UnstakeSelectValidatorScreen = (): JSX.Element => {
    const translate = useTranslate();
    const setTab = useSetTab();
    const translateError = useTranslate("error");

    const { stakingValidators, isLoading } = useGetStakingValidators();

    return (
        <StakingSelectValidatorScreen
            message={translate("select_unstake_validator")}
            validators={stakingValidators}
            loading={isLoading}
            onSelected={() => setTab(UnstakeModalScreens.SET_AMOUNT)}
            stakingBalanceType="staked"
            emptyListMessage={translateError("you_are_not_staking")}
        />
    );
};

export default UnstakeSelectValidatorScreen;
