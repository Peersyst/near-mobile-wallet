import { List, ListProps } from "@peersyst/react-native-components";

export type MainListProps = Omit<ListProps, "ItemSeparatorComponent" | "style">;

const MainList = (props: MainListProps): JSX.Element => {
    return <List contentContainerStyle={{ paddingHorizontal: "6%", paddingVertical: 12 }} {...props} />;
};

export default MainList;
