import { Col, Hash } from "@peersyst/react-native-components";
import { ConnectedSiteProps } from "./ConnectedSite.types";
import Typography from "module/common/component/display/Typography/Typography";
import { ConnectedSiteRoot, ConnectedSiteLogo } from "./ConnectedSite.styles";
import useConnectedSiteLogo from "module/signer/queries/useConnectedSiteLogo";

const ConnectedSite = ({
    site: {
        name,
        accessKey: { public_key },
    },
}: ConnectedSiteProps) => {
    const { data: siteLogo, isLoading } = useConnectedSiteLogo({ contractId: name });

    return (
        <ConnectedSiteRoot flex={1} gap={12}>
            <ConnectedSiteLogo loading={isLoading} source={{ uri: siteLogo }} />
            <Col flex={1}>
                <Typography variant="body3Strong">{name}</Typography>
                <Hash variant="body4Regular" hash={public_key.slice(8)} ellipsis="middle" />
            </Col>
        </ConnectedSiteRoot>
    );
};

export default ConnectedSite;
