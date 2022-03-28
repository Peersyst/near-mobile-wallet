import Divider from "module/common/component/display/Divider/Divider";
import { List } from "react-native-components";
import { ListProps } from "module/common/component/base/display/List/List";

export type MainListProps = Omit<ListProps, "ItemSeparatorComponent" | "style">;

const MainList = ({ indicatorStyle, ...rest }: MainListProps): JSX.Element => (
    <List
        ItemSeparatorComponent={() => <Divider width="full-width" />}
        style={{ paddingHorizontal: "5%" }}
        refreshControlProps={{ tintColor: "black" }}
        indicatorStyle={indicatorStyle || "black"}
        {...rest}
    />
);

export default MainList;
