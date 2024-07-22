import useGetStakingDetailsSections from "module/staking/hook/useGetStakingDetailsSections";
import MainList from "module/main/component/display/MainList/MainList";
import StakingDetailCard from "../StakingDetailCard/StakingDetailCard";
import MainListSkeleton from "module/main/component/display/MainList/MainListSkeleton";
import StakingDetailCardSkeleton from "../StakingDetailCard/StakingDetailCardSkeleton";

const MyStakingList = (): JSX.Element => {
    const { sections, isIdle, isLoading, refetch } = useGetStakingDetailsSections();

    return isIdle || isLoading ? (
        <MainListSkeleton Skeleton={StakingDetailCardSkeleton} />
    ) : (
        <MainList
            onRefresh={refetch}
            data={sections}
            renderItem={({ item: { title, ...rest } }) => <StakingDetailCard key={title} title={title} isLoading={isLoading} {...rest} />}
            keyExtractor={(_, index) => index.toString()}
        />
    );
};

export default MyStakingList;
