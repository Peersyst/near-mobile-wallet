import { DAppProps } from "./DApp.types";
import { DAppRoot, DAppLogo, DAppTag, DAppLinkIcon } from "./DApp.styles";
import { Col, Row, Typography } from "@peersyst/react-native-components";
import DAppStatus from "../DAppStatus/DAppStatus";
import { Linking } from "react-native";

const DApp = ({ dapp, connected = false }: DAppProps): JSX.Element => {
    const { name, description, logoUrl, url, tag } = dapp;

    return (
        <DAppRoot gap={16}>
            <DAppLogo source={{ uri: logoUrl }} />
            <Col flex={1}>
                <Row justifyContent="center" alignItems="center">
                    <DAppLinkIcon onPress={() => Linking.openURL(url)} />
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
