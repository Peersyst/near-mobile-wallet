import { View } from "react-native";
import DisconnectableDApp from "../../feedback/DisconnectableDApp/DisconnectableDApp";
import { DisconnectableDAppListProps } from "./DisconnectableDAppList.types";
import { List } from "@peersyst/react-native-components";
import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import useTranslate from "module/common/hook/useTranslate";

const DisconnectableDAppList = ({ dapps, loading = false, ...rest }: DisconnectableDAppListProps): JSX.Element => {
    const translate = useTranslate();

    return (
        <List
            data={dapps}
            loading={loading}
            renderItem={({ item }) => <DisconnectableDApp dapp={item} />}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            keyExtractor={(_, index) => index.toString()}
            ListEmptyComponent={<EmptyListComponent title={translate("noDApps")} text={translate("noDAppsDescription")} />}
            {...rest}
        />
    );
};

export default DisconnectableDAppList;
