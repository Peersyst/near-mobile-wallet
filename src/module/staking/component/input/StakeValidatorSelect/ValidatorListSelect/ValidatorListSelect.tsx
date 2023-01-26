import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import MainList from "module/main/component/display/MainList/MainList";
import StakingListItemSelect from "../StakingListItemSelect/StakingListItemSelect";
import { Validator } from "near-peersyst-sdk";
import { ValidatorStakingBalanceProps } from "module/staking/component/display/ValidatorInformation/ValidatorStakingBalance/ValidatorStakingBalance";

export interface StakingListProps extends Pick<ValidatorStakingBalanceProps, "stakingBalanceType"> {
    validators: Validator[]; //Validators to be displayed
    isLoading: boolean; //Loading state
}
const ValidatorListSelect = ({ validators, isLoading, ...rest }: StakingListProps): JSX.Element => {
    const haveElementList = validators.length > 0;
    const showEmptyList = !isLoading && !haveElementList;

    return (
        <MainList
            contentContainerStyle={{ padding: 0 }}
            loading={isLoading}
            ListEmptyComponent={showEmptyList ? <EmptyListComponent /> : undefined}
            data={validators}
            renderItem={({ item: validator }) => <StakingListItemSelect validator={validator} {...rest} />}
            keyExtractor={(validator) => validator.accountId}
        />
    );
};

export default ValidatorListSelect;
