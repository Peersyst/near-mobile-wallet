import useGetStakingDetailsSections from "module/staking/hook/useGetStakingDetailsSections";
import MainList from "module/main/component/display/MainList/MainList";
import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import StakingDetail from "../StakingDetail/StakingDetail";

const StakingDetails = (): JSX.Element => {
    const { sections, isLoading } = useGetStakingDetailsSections();

    return (
        <MainList
            loading={isLoading}
            ListEmptyComponent={isLoading ? undefined : <EmptyListComponent />}
            data={sections}
            renderItem={({ item: { title, amount, stakeable } }) => (
                <StakingDetail key={title} title={title} amount={amount} stakeable={stakeable} />
            )}
            keyExtractor={(_, index) => index.toString()}
        />
    );
};

export default StakingDetails;
