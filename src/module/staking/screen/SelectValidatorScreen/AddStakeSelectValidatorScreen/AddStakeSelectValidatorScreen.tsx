import { useTranslate } from "module/common/hook/useTranslate";
import useGetAllValidators from "module/staking/query/useGetAllValidators";
import { useSetTab } from "@peersyst/react-native-components";
import { AddStakeScreens } from "module/staking/component/core/AddStakeModal/AddStakeModal";
import StakingSelectValidatorScreen from "../StakingSelectValidatorScreen";

const AddStakeSelectValidatorScreen = (): JSX.Element => {
    const translate = useTranslate();
    const translateError = useTranslate("error");
    const setTab = useSetTab();

    const { data: validators = [], isLoading } = useGetAllValidators();

    return (
        <StakingSelectValidatorScreen
            validators={validators}
            loading={isLoading}
            message={translate("enter_new_validator")}
            onSelected={() => setTab(AddStakeScreens.CONFIRM_VALIDATOR)}
            stakingBalanceType="staked"
            withSearch
            emptyListMessage={translateError("no_validators_available")}
        />
    );
};

export default AddStakeSelectValidatorScreen;
