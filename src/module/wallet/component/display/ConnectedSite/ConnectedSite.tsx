import { Col, Hash } from "@peersyst/react-native-components";
import { ConnectedSiteProps } from "./ConnectedSite.types";
import Typography from "module/common/component/display/Typography/Typography";
import { ConnectedSiteRoot, ConnectedSiteLogo } from "./ConnectedSite.styles";
import { TouchableWithoutFeedback } from "react-native";

const ConnectedSite = ({ site: { name, publicKey } }: ConnectedSiteProps) => {
    return (
        <TouchableWithoutFeedback>
            <ConnectedSiteRoot flex={1} gap={12}>
                <ConnectedSiteLogo source={{ uri: "" }} />
                <Col flex={1}>
                    <Typography variant="body3Strong">{name}</Typography>
                    <Hash variant="body4Regular" hash={publicKey.slice(8)} ellipsis="middle" />
                </Col>
            </ConnectedSiteRoot>
        </TouchableWithoutFeedback>
    );
};

export default ConnectedSite;
