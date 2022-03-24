import { Col, Row } from "react-native-components";
import { NavbarProps } from "module/common/component/navigation/Navbar/Navbar.types";
import { ReactNode } from "react";
import FullScreenModal from "module/common/component/layout/FullScreenModal/FullScreenModal";

export interface BaseSettingsModalScreenProps extends NavbarProps {
    children: ReactNode;
}

const BaseSettingsModalScreen = ({ children, ...navbarProps }: BaseSettingsModalScreenProps): JSX.Element => {
    return (
        <FullScreenModal {...navbarProps} appearance={"dark"} back>
            <Col flex={1} justifyContent="center">
                <Row flex={1} style={{ maxHeight: 500 }}>
                    {children}
                </Row>
            </Col>
        </FullScreenModal>
    );
};

export default BaseSettingsModalScreen;
