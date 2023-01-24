import useGetStakingDetailsSections from "module/staking/hook/useGetStakingDetailsSections";
import MainList from "module/main/component/display/MainList/MainList";
import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import StakingDetailCard from "../StakingDetailCard/StakingDetailCard";

const MyStakingList = (): JSX.Element => {
    const { sections, isLoading, refetch } = useGetStakingDetailsSections();

    return (
        <MainList
            loading={isLoading}
            onRefresh={refetch}
            ListEmptyComponent={isLoading ? undefined : <EmptyListComponent />}
            data={sections}
            renderItem={({ item: { title, amount, stakeable } }) => (
                <StakingDetailCard key={title} title={title} amount={amount} stakeable={stakeable} isLoading={isLoading} />
            )}
            keyExtractor={(_, index) => index.toString()}
        />
    );
};

export default MyStakingList;
