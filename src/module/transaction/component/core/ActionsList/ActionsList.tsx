import MainList from "module/main/component/display/MainList/MainList";
import useGetActions from "module/transaction/query/useGetActions";
import ActionCard from "../../display/ActionCard/ActionCard";
import EmptyActionsList from "../../feedback/EmptyActionsList/EmptyActionsList";
import MainListSkeleton from "module/main/component/display/MainList/MainListSkeleton";
import ActionCardSkeleton from "../../display/ActionCard/ActionCardSkeleton";

const ActionsList = (): JSX.Element => {
    const { data = [], isLoading, isIdle, refetch: refetchActions } = useGetActions();

    const handleRefetch = async () => {
        await refetchActions();
    };

    return isIdle || isLoading ? (
        <MainListSkeleton Skeleton={ActionCardSkeleton} />
    ) : (
        <MainList
            onRefresh={handleRefetch}
            data={data}
            ListEmptyComponent={<EmptyActionsList />}
            renderItem={({ item: action }) => <ActionCard action={action} />}
            keyExtractor={(_, index) => index.toString()}
        />
    );
};

export default ActionsList;
