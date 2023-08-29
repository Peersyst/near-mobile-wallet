import { View } from "react-native";
import DisconnectableDApp from "../../feedback/DisconnectableDApp/DisconnectableDApp";
import { DisconnectableDAppListProps } from "./DisconnectableDAppList.types";
import { List } from "@peersyst/react-native-components";
import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import { useTranslate } from "module/common/hook/useTranslate";

const DisconnectableDAppList = ({ dapps }: DisconnectableDAppListProps): JSX.Element => {
    const translate = useTranslate();

    return (
        <List
            data={dapps}
            renderItem={({ item }) => <DisconnectableDApp dapp={item} />}
            contentContainerStyle={{ padding: 20 }}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            keyExtractor={(_, index) => index.toString()}
            ListEmptyComponent={<EmptyListComponent title={translate("noDApps")} text={translate("noDAppsDescription")} />}
        />
    );
};

export default DisconnectableDAppList;