import BasePage from "module/common/component/layout/BasePage/BasePage";
import { Toolbar } from "react-native-components";
import Navbar from "module/common/component/navigation/Navbar/Navbar";
import { NavbarProps } from "module/common/component/navigation/Navbar/Navbar.types";
import { ReactNode } from "react";
import { View } from "react-native";
import { Col } from "react-native-components";

export interface BaseSettingsModalScreenProps extends NavbarProps {
    children: ReactNode;
}

const BaseSettingsModalScreen = ({ children, ...navbarProps }: BaseSettingsModalScreenProps): JSX.Element => {
    return (
        <BasePage appearance="dark" header={false} showIcons={false}>
            <Toolbar>{Object.entries(navbarProps).length > 0 && <Navbar {...navbarProps} />}</Toolbar>
            <Col flex={1} gap={20} style={{ paddingTop: 20 }}>
                <View style={{ flex: 1 }}>{children}</View>
            </Col>
        </BasePage>
    );
};

export default BaseSettingsModalScreen;
