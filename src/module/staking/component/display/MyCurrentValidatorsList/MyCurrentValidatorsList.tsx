import ValidatorInformation from "module/staking/component/display/ValidatorInformation/ValidatorInformation";
import useGetStakingValidators from "module/staking/hook/useGetStakingValidators";
import MainList from "module/main/component/display/MainList/MainList";
import EmptyValidatorList from "../../feedback/EmptyValidatorList/EmptyValidatorList";
import useTranslate from "module/common/hook/useTranslate";

const MyCurrentValidatorsList = (): JSX.Element => {
    const { stakingValidators: validators, isLoading, refetch } = useGetStakingValidators();
    const translate = useTranslate("error");

    return (
        <MainList
            loading={isLoading}
            data={validators}
            onRefresh={refetch}
            renderItem={({ item: validator }) => <ValidatorInformation key={validator.accountId} validator={validator} />}
            ListEmptyComponent={isLoading ? undefined : <EmptyValidatorList text={translate("you_are_not_staking")} />}
        />
    );
};

export default MyCurrentValidatorsList;
