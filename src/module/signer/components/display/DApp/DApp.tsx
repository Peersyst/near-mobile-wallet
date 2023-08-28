import { DAppProps } from "./DApp.types";
import { DAppRoot, DAppLogo, DAppTag } from "./DApp.styles";
import { Col, IconButton, Row, Typography } from "@peersyst/react-native-components";
import DAppStatus from "../DAppStatus/DAppStatus";
import { ExternalLinkIcon } from "icons";
import { Linking } from "react-native";

const DApp = ({ dapp, connected = false }: DAppProps): JSX.Element => {
    const { name, description, logoUrl, url, tag } = dapp;

    return (
        <DAppRoot gap={16}>
            <DAppLogo source={{ uri: logoUrl }} />
            <Col flex={1}>
                <Row justifyContent="center" alignItems="center">
                    <IconButton style={{ fontSize: 16 }} onPress={() => Linking.openURL(url)}>
                        <ExternalLinkIcon />
                    </IconButton>
                    <Typography variant="body2Strong" style={{ flex: 1 }}>
                        {name}
                    </Typography>
                    <DAppStatus connected={connected} />
                </Row>
                <DAppTag variant="body4Strong">{`#${tag}`}</DAppTag>
                <Typography variant="body4Strong" light numberOfLines={2}>
                    {description}
                </Typography>
            </Col>
        </DAppRoot>
    );
};

export default DApp;
