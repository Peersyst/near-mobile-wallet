import MainList from "./MainList";

export type MainListSkeletonProps = {
    Skeleton: () => JSX.Element;
    skeletonCount?: number;
};

const MainListSkeleton = ({ Skeleton, skeletonCount = 10 }: MainListSkeletonProps): JSX.Element => {
    return <MainList scrollEnabled={false} data={Array(skeletonCount).fill(null)} renderItem={({ index }) => <Skeleton key={index} />} />;
};

export default MainListSkeleton;
