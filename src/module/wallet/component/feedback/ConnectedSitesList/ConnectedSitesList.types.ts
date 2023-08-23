import { ListProps } from "@peersyst/react-native-components";
import { ConnectedSite } from "../../display/ConnectedSite/ConnectedSite.types";

export interface ActionableConnectedSitesListProps extends Omit<ListProps, "data" | "renderItem" | "keyExtractor"> {
    sites: ConnectedSite[] | undefined;
}
