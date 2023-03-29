import MainList from "module/main/component/display/MainList/MainList";
import useGetActions from "module/transaction/query/useGetActions";
import ActionCard from "../../display/ActionCard/ActionCard";
import EmptyActionsList from "../../feedback/EmptyActionsList/EmptyActionsList";

const ActionsList = (): JSX.Element => {
    const { data = [], isLoading, refetch: refetchActions } = useGetActions();

    const handleRefetch = async () => {
        await refetchActions();
    };

    return (
        <MainList
            onRefresh={handleRefetch}
            loading={isLoading}
            data={data}
            ListEmptyComponent={isLoading ? undefined : <EmptyActionsList />}
            renderItem={({ item: action }) => <ActionCard action={action} />}
            keyExtractor={(_, index) => index.toString()}
        />
    );
};

export default ActionsList;
