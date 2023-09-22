import { ExposedBackdropProps } from "@peersyst/react-native-components";
import { ConnectedSite } from "module/signer/components/display/ConnectedSite/ConnectedSite.types";

export interface DisconnectSiteModalProps extends ExposedBackdropProps {
    site: ConnectedSite;
}
