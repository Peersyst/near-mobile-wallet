import { Row } from "@peersyst/react-native-components";
import { DAppsImage, DAppsImageWrapper } from "./DAppsScreenCTA.styles";
import { dapps1, dapps2, dapps3 } from "images";

export const DAppsScreenCTAImage = () => {
    return (
        <Row style={{ height: 56 }} alignItems="center">
            <DAppsImageWrapper style={{ marginRight: -10, zIndex: 1, transform: [{ rotate: "15.09deg" }] }}>
                <DAppsImage source={dapps2} />
            </DAppsImageWrapper>
            <DAppsImageWrapper style={{ zIndex: 2, marginTop: -10 }}>
                <DAppsImage source={dapps1} />
            </DAppsImageWrapper>
            <DAppsImageWrapper style={{ marginLeft: -10, zIndex: 1, transform: [{ rotate: "8.79deg" }] }}>
                <DAppsImage source={dapps3} />
            </DAppsImageWrapper>
        </Row>
    );
};
