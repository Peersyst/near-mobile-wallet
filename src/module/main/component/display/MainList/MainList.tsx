import { List } from "@peersyst/react-native-components";
import { ListProps } from "@peersyst/react-native-components";

export type MainListProps = Omit<ListProps, "ItemSeparatorComponent" | "style">;

const MainList = ({ ...rest }: MainListProps): JSX.Element => {
    return <List contentContainerStyle={{ paddingHorizontal: "6%", paddingVertical: 12 }} {...rest} />;
};

export default MainList;
