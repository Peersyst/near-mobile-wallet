import { NavbarProps } from "module/common/component/navigation/Navbar/Navbar.types";
import { BreadcrumbsProps } from "module/common/component/display/Breadcrumbs/Breadcrumbs.types";
import { ReactNode } from "react";
import Glass, { GlassProps } from "module/common/component/surface/Glass/Glass";
import Navbar from "module/common/component/navigation/Navbar/Navbar";
import Breadcrumbs from "module/common/component/display/Breadcrumbs/Breadcrumbs";
import { Col, Row } from "react-native-components";
import { GlassNavigatorContent } from "module/common/component/navigation/GlassNavigator/GlassNavigator.styles";
import { ScrollView } from "react-native";

export interface GlassNavigatorProps extends GlassProps {
    navbar?: NavbarProps;
    breadcrumbs?: BreadcrumbsProps;
    children?: ReactNode;
    scrollable?: boolean;
}

const GlassNavigator = ({
    navbar: navbarProps,
    breadcrumbs: breadcrumbsProps,
    children,
    scrollable,
    ...rest
}: GlassNavigatorProps): JSX.Element => (
    <Glass {...rest}>
        <Col gap={"8%"} flex={1}>
            <Col gap={15}>
                {navbarProps && <Navbar {...navbarProps} />}
                {breadcrumbsProps && (
                    <Row justifyContent="center">
                        <Breadcrumbs {...breadcrumbsProps} />
                    </Row>
                )}
            </Col>
            <ScrollView
                style={{ marginHorizontal: -20 }}
                contentContainerStyle={scrollable && { flex: 1, justifyContent: "flex-end" }}
                alwaysBounceVertical={false}
            >
                <GlassNavigatorContent onStartShouldSetResponder={() => true} flex={1} justifyContent="flex-end">
                    {children}
                </GlassNavigatorContent>
            </ScrollView>
        </Col>
    </Glass>
);

export default GlassNavigator;
