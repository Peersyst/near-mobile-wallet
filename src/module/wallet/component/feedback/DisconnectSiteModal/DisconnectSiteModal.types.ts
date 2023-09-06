import { ExposedBackdropProps } from "@peersyst/react-native-components";
import { ConnectedSite } from "../../display/ConnectedSite/ConnectedSite.types";

export interface DisconnectSiteModalProps extends ExposedBackdropProps {
    site: ConnectedSite;
}
