import Divider from "module/common/component/display/Divider/Divider";
import { List } from "react-native-components";
import { ListProps } from "module/common/component/base/display/List/List";
import useCkbSync from "module/wallet/hook/useCkbSync";

export type MainListProps = Omit<ListProps, "ItemSeparatorComponent" | "style">;

const MainList = ({ indicatorStyle, loading, onRefresh, ...rest }: MainListProps): JSX.Element => {
    const { synchronizing, synchronize } = useCkbSync();

    const handleRefresh = async () => {
        await synchronize();
        onRefresh?.();
    };

    return (
        <List
            ItemSeparatorComponent={() => <Divider width="full-width" />}
            style={{ paddingHorizontal: "5%" }}
            refreshControlProps={{ tintColor: "black" }}
            indicatorStyle={indicatorStyle || "black"}
            loading={synchronizing || loading}
            onRefresh={handleRefresh}
            {...rest}
        />
    );
};

export default MainList;
