import { FlatList, FlatListProps, ScrollView } from "react-native";

/**
 * Component used to render a nested FlatList.
 * A FlatList should never be rendered directly inside another ScrollView with the same orientation.
 * That's why we need to wrap it with a ScrollView in an horizontal direction.
 * More info here https://nyxo.app/fixing-virtualizedlists-should-never-be-nested-inside-plain-scrollviews
 */

const List = (props: FlatListProps<any>): JSX.Element => (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }} horizontal scrollEnabled={false}>
        <FlatList {...props} />
    </ScrollView>
);

export default List;
