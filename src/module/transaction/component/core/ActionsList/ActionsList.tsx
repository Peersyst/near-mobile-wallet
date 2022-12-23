import MainList from "module/main/component/display/MainList/MainList";
import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import useGetActions from "module/transaction/query/useGetActions";
import ActionCard from "../../display/ActionCard/ActionCard";

const ActionsList = (): JSX.Element => {
    const { data = [], isLoading } = useGetActions();

    return (
        <MainList
            loading={isLoading}
            data={data}
            ListEmptyComponent={isLoading ? undefined : <EmptyListComponent />}
            renderItem={({ item: action }) => <ActionCard action={action} />}
            keyExtractor={(_, index) => index.toString()}
        />
    );
};

export default ActionsList;
