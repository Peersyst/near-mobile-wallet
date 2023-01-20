import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import MainList from "module/main/component/display/MainList/MainList";
import StakingListItemSelect from "../StakingListItemSelect/StakingListItemSelect";
import { Validator } from "near-peersyst-sdk";

export interface StakingListProps {
    validators: Validator[]; //Validators to be displayed
    isLoading: boolean; //Loading state
}
const ValidatorListSelect = ({ validators, isLoading }: StakingListProps): JSX.Element => {
    const haveElementList = validators.length > 0;
    const showEmptyList = !isLoading && !haveElementList;

    return (
        <MainList
            contentContainerStyle={{ padding: 0 }}
            loading={isLoading}
            ListEmptyComponent={showEmptyList ? <EmptyListComponent /> : undefined}
            data={validators}
            renderItem={({ item: validator }) => <StakingListItemSelect validator={validator} />}
            keyExtractor={(validator) => validator.accountId}
        />
    );
};

export default ValidatorListSelect;
