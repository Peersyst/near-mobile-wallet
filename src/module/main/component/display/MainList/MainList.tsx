import { FlatListProps, RefreshControl } from "react-native";
import Divider from "module/common/component/display/Divider/Divider";
import { List } from "react-native-components";

export type MainListProps = Omit<FlatListProps<any>, "ItemSeparatorComponent" | "style" | "refreshControl">;

const MainList = ({ data, onRefresh, refreshing, ...rest }: MainListProps): JSX.Element => (
    <List
        data={data}
        ItemSeparatorComponent={() => <Divider width="full-width" />}
        style={{ paddingHorizontal: "5%" }}
        refreshControl={<RefreshControl onRefresh={onRefresh || undefined} refreshing={!!refreshing} tintColor="black" />}
        {...rest}
    />
);

export default MainList;
