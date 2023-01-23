import SelectValidatorScreen from "module/staking/screen/SelectValidatorScreen/SelectValidatorScreen";
import { UnstakeModalScreens } from "module/staking/component/core/UnstakeModal/UnstakeModal";
import { useTranslate } from "module/common/hook/useTranslate";
import { useSetTab } from "@peersyst/react-native-components";
import useGetStakingValidators from "module/staking/hook/useGetStakingValidators";

const UnstakeSelectValidatorScreen = (): JSX.Element => {
    const translate = useTranslate();
    const setTab = useSetTab();

    const { stakingValidators, isLoading } = useGetStakingValidators();

    return (
        <SelectValidatorScreen
            message={translate("select_unstake_validator")}
            validators={stakingValidators}
            loading={isLoading}
            onSelected={() => setTab(UnstakeModalScreens.SET_AMOUNT)}
            balanceType="staked"
        />
    );
};

export default UnstakeSelectValidatorScreen;
