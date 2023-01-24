import ValidatorInformation from "module/staking/component/display/ValidatorInformation/ValidatorInformation";
import useGetStakingValidators from "module/staking/hook/useGetStakingValidators";
import MainList from "module/main/component/display/MainList/MainList";
import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";

const MyCurrentValidatorsList = (): JSX.Element => {
    const { stakingValidators: validators, isLoading, refetch } = useGetStakingValidators();

    return (
        <MainList
            loading={isLoading}
            data={validators}
            onRefresh={refetch}
            renderItem={({ item: validator }) => <ValidatorInformation key={validator.accountId} validator={validator} />}
            ListEmptyComponent={isLoading ? undefined : <EmptyListComponent />}
        />
    );
};

export default MyCurrentValidatorsList;
