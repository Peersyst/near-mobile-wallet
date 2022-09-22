import { NavbarProps } from "module/common/component/navigation/Navbar/Navbar.types";
import { BreadcrumbsProps } from "module/common/component/display/Breadcrumbs/Breadcrumbs.types";
import { ReactNode } from "react";
import Navbar from "module/common/component/navigation/Navbar/Navbar";
import { Col } from "@peersyst/react-native-components";
import { ScrollView } from "react-native";
import { ViewStyle } from "react-native";
import { MainNavigatorContent, MainNavigatorRoot } from "./MainNavigator.styles";

export interface MainNavigatorProps {
    navbar?: NavbarProps;
    breadcrumbs?: BreadcrumbsProps;
    children?: ReactNode;
    scrollable?: boolean;
    style?: ViewStyle;
}

const MainNavigator = ({ navbar: navbarProps, children, scrollable, style }: MainNavigatorProps): JSX.Element => (
    <MainNavigatorRoot style={style}>
        <Col gap={"8%"} flex={1}>
            <Col gap={15}>{navbarProps && <Navbar {...navbarProps} />}</Col>
            <ScrollView contentContainerStyle={!scrollable && { flex: 1, justifyContent: "flex-end" }} scrollEnabled={!!scrollable}>
                <MainNavigatorContent onStartShouldSetResponder={() => true} flex={1} justifyContent="flex-end">
                    {children}
                </MainNavigatorContent>
            </ScrollView>
        </Col>
    </MainNavigatorRoot>
);

export default MainNavigator;
