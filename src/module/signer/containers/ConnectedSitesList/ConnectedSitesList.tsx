import EmptyListComponent from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import { ActionableConnectedSitesListProps } from "./ConnectedSitesList.types";
import { useTranslate } from "module/common/hook/useTranslate";
import ActionableConnectedSite from "../ActionableConnectedSite/ActionableConnectedSite";
import { List } from "@peersyst/react-native-components";

const ActionableConnectedSitesList = ({ sites }: ActionableConnectedSitesListProps): JSX.Element => {
    const transalteError = useTranslate("error");

    return (
        <List
            data={sites}
            renderItem={({ item }) => <ActionableConnectedSite site={item} />}
            keyExtractor={(_, index) => index.toString()}
            ListEmptyComponent={
                <EmptyListComponent title={transalteError("noConnectedSites")} text={transalteError("noConnectedSitesDescription")} />
            }
            style={{ width: "100%" }}
        />
    );
};

export default ActionableConnectedSitesList;
