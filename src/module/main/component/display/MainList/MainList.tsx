import { List } from "@peersyst/react-native-components";
import { ListProps } from "@peersyst/react-native-components";
import useCkbSync from "module/wallet/hook/useCkbSync";

export type MainListProps = Omit<ListProps, "ItemSeparatorComponent" | "style">;

const MainList = ({ loading, onRefresh, ...rest }: MainListProps): JSX.Element => {
    const { synchronizing, synchronize } = useCkbSync();
    const handleRefresh = async () => {
        await synchronize();
        onRefresh?.();
    };

    return (
        <List
            contentContainerStyle={{ paddingHorizontal: "6%", paddingVertical: 12 }}
            loading={synchronizing || loading}
            onRefresh={handleRefresh}
            {...rest}
        />
    );
};

export default MainList;
