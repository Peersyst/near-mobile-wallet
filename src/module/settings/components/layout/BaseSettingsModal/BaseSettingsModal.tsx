import { Col, Row } from "@peersyst/react-native-components";
import FullScreenModal from "module/common/component/layout/FullScreenModal/FullScreenModal";
import { BaseSettingsModalScreenProps } from "./BaseSettingsModal.types";

const BaseSettingsModalScreen = ({ children, ...rest }: BaseSettingsModalScreenProps): JSX.Element => {
    return (
        <FullScreenModal {...rest} appearance={"dark"} back>
            <Col flex={1} justifyContent="center">
                <Row flex={1} style={{ maxHeight: 500 }}>
                    {children}
                </Row>
            </Col>
        </FullScreenModal>
    );
};

export default BaseSettingsModalScreen;
