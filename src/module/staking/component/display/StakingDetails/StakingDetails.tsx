import useGetStakingDetailsSections from "module/staking/hook/useGetStakingDetailsSections";
import MainList from "module/main/component/display/MainList/MainList";
import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import StakingDetailCard from "../StakingDetailCard/StakingDetailCard";

const StakingDetails = (): JSX.Element => {
    const { sections, isLoading } = useGetStakingDetailsSections();

    return (
        <MainList
            loading={isLoading}
            ListEmptyComponent={isLoading ? undefined : <EmptyListComponent />}
            data={sections}
            renderItem={({ item: { title, ...rest } }) => <StakingDetailCard key={title} title={title} isLoading={isLoading} {...rest} />}
            keyExtractor={(_, index) => index.toString()}
        />
    );
};

export default StakingDetails;
