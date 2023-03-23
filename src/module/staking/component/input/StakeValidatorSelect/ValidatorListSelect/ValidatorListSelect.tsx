import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import StakingListItemSelect from "../StakingListItemSelect/StakingListItemSelect";
import { Validator } from "near-peersyst-sdk";
import { ValidatorStakingBalanceProps } from "module/staking/component/display/ValidatorInformation/ValidatorStakingBalance/ValidatorStakingBalance";
import { List } from "@peersyst/react-native-components";

export interface StakingListProps extends Pick<ValidatorStakingBalanceProps, "stakingBalanceType"> {
    validators: Validator[]; //Validators to be displayed
    isLoading: boolean; //Loading state
}
const ValidatorListSelect = ({ validators, isLoading, ...rest }: StakingListProps): JSX.Element => {
    const haveElementList = validators.length > 0;
    const showEmptyList = !isLoading && !haveElementList;

    return (
        <List
            loading={isLoading}
            ListEmptyComponent={showEmptyList ? <EmptyListComponent /> : undefined}
            data={validators}
            renderItem={({ item: validator }) => <StakingListItemSelect validator={validator} {...rest} />}
            keyExtractor={(_, index) => index.toString()}
        />
    );
};

export default ValidatorListSelect;
