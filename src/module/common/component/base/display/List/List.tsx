import { FlatList, FlatListProps, RefreshControl, RefreshControlPropsAndroid, RefreshControlPropsIOS, ScrollView } from "react-native";
import { useState } from "react";

export interface ListProps extends Omit<FlatListProps<any>, "refreshControl" | "refreshing"> {
    refreshControlProps?: RefreshControlPropsIOS & RefreshControlPropsAndroid;
    loading?: boolean;
}

/**
 * Component used to render a nested FlatList.
 * A FlatList should never be rendered directly inside another ScrollView with the same orientation.
 * That's why we need to wrap it with a ScrollView in an horizontal direction.
 * More info here https://nyxo.app/fixing-virtualizedlists-should-never-be-nested-inside-plain-scrollviews
 */

const List = ({ onRefresh, loading = false, refreshControlProps, ...rest }: ListProps): JSX.Element => {
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = async () => {
        setRefreshing(true);
        await onRefresh?.();
        setRefreshing(false);
    };

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }} horizontal scrollEnabled={false}>
            <FlatList
                refreshControl={
                    onRefresh || loading ? (
                        <RefreshControl refreshing={loading || refreshing} onRefresh={handleRefresh} {...refreshControlProps} />
                    ) : undefined
                }
                {...rest}
            />
        </ScrollView>
    );
};

export default List;
