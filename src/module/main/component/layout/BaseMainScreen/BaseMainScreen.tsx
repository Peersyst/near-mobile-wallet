import { NavbarProps } from "module/common/component/navigation/Navbar/Navbar.types";
import { ReactNode } from "react";
import Navbar from "module/common/component/navigation/Navbar/Navbar";
import { View } from "react-native";
import { Col } from "react-native-components";

export interface BaseMainScreenProps extends NavbarProps {
    children: ReactNode;
}

const BaseMainScreen = ({ children, ...navbarProps }: BaseMainScreenProps): JSX.Element => {
    return (
        <Col gap={20} style={{ flex: 1, paddingTop: 20 }}>
            {Object.entries(navbarProps).length > 0 && <Navbar {...navbarProps} />}
            <View style={{ flex: 1 }}>{children}</View>
        </Col>
    );
};

export default BaseMainScreen;
