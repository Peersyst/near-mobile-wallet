import { DAppProps } from "./DApp.types";
import { DAppRoot, DAppLogo, DAppTag, DAppLinkIcon } from "./DApp.styles";
import { Col, Row, Skeleton, Typography } from "@peersyst/react-native-components";
import DAppStatus from "../DAppStatus/DAppStatus";
import { Linking } from "react-native";

const DApp = ({ dapp, connected = false, loading = false }: DAppProps): JSX.Element => {
    const { name, description, logoUrl, url, tag } = dapp;

    return (
        <DAppRoot gap={16}>
            <DAppLogo source={{ uri: logoUrl }} />
            <Col flex={1}>
                <Skeleton loading={loading}>
                    <Row justifyContent="center" alignItems="center">
                        <DAppLinkIcon onPress={() => Linking.openURL(url)} />
                        <Typography variant="body2Strong" numberOfLines={1} style={{ flex: 1 }}>
                            {name}
                        </Typography>
                        <DAppStatus connected={connected} />
                    </Row>
                </Skeleton>
                <Skeleton loading={loading}>
                    <DAppTag variant="body4Strong">{`#${tag}`}</DAppTag>
                </Skeleton>
                <Skeleton loading={loading}>
                    <Typography variant="body4Strong" light numberOfLines={2}>
                        {description}
                    </Typography>
                </Skeleton>
            </Col>
        </DAppRoot>
    );
};

export default DApp;
