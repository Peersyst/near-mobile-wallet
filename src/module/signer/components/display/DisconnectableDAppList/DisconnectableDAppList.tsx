import { View } from "react-native";
import DisconnectableDApp from "../../feedback/DisconnectableDApp/DisconnectableDApp";
import { DisconnectableDAppListProps } from "./DisconnectableDAppList.types";
import { List } from "@peersyst/react-native-components";

const DisconnectableDAppList = ({ dapps }: DisconnectableDAppListProps): JSX.Element => {
    return (
        <List
            data={dapps}
            renderItem={({ item }) => <DisconnectableDApp dapp={item} />}
            contentContainerStyle={{ padding: 20 }}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            keyExtractor={(_, index) => index.toString()}
        />
    );
};

export default DisconnectableDAppList;
