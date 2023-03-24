import StakingListItemSelect from "../StakingListItemSelect/StakingListItemSelect";
import { Validator } from "near-peersyst-sdk";
import { ValidatorStakingBalanceProps } from "module/staking/component/display/ValidatorInformation/ValidatorStakingBalance/ValidatorStakingBalance";
import { List } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import EmptyValidatorList from "module/staking/component/feedback/EmptyValidatorList/EmptyValidatorList";

export interface StakingListProps extends Pick<ValidatorStakingBalanceProps, "stakingBalanceType"> {
    validators: Validator[]; //Validators to be displayed
    isLoading: boolean; //Loading state
}

const ValidatorListSelect = ({ validators, isLoading, ...rest }: StakingListProps): JSX.Element => {
    const translate = useTranslate("error");

    const haveElementList = validators.length > 0;
    const showEmptyList = !isLoading && !haveElementList;

    return (
        <List
            loading={isLoading}
            ListEmptyComponent={showEmptyList ? <EmptyValidatorList text={translate("you_are_not_staking")} /> : undefined}
            data={validators}
            renderItem={({ item: validator }) => <StakingListItemSelect validator={validator} {...rest} />}
            keyExtractor={(_, index) => index.toString()}
        />
    );
};

export default ValidatorListSelect;
