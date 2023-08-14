import { Col, Hash } from "@peersyst/react-native-components";
import { ConnectedSiteProps } from "./ConnectedSite.types";
import CardIcon from "module/common/component/display/CardIcon/CardIcon";
import { LaptopIcon } from "icons";
import Typography from "module/common/component/display/Typography/Typography";
import { ConnectedSiteRoot } from "./ConnectedSite.styles";
import { TouchableWithoutFeedback } from "react-native";

const ConnectedSite = ({ site: { name, publicKey } }: ConnectedSiteProps) => {
    return (
        <TouchableWithoutFeedback>
            <ConnectedSiteRoot flex={1} gap={12}>
                <CardIcon Icon={LaptopIcon} active={true} />
                <Col flex={1}>
                    <Typography variant="body3Strong">{name}</Typography>
                    <Hash variant="body4Regular" hash={publicKey.slice(8)} ellipsis="middle" length={9} />
                </Col>
            </ConnectedSiteRoot>
        </TouchableWithoutFeedback>
    );
};

export default ConnectedSite;
