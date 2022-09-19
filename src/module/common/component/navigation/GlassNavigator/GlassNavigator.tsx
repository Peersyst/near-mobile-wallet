import { NavbarProps } from "module/common/component/navigation/Navbar/Navbar.types";
import { BreadcrumbsProps } from "module/common/component/display/Breadcrumbs/Breadcrumbs.types";
import { ReactNode } from "react";
import Glass, { GlassProps } from "module/common/component/surface/Glass/Glass";
import Navbar from "module/common/component/navigation/Navbar/Navbar";
import Breadcrumbs from "module/common/component/display/Breadcrumbs/Breadcrumbs";
import { Col, Row } from "@peersyst/react-native-components";
import { GlassNavigatorContent } from "module/common/component/navigation/GlassNavigator/GlassNavigator.styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
        <Col gap={"8%"} flex={1} onStartShouldSetResponder={() => true}>
            <Col gap={15}>
                {navbarProps && <Navbar {...navbarProps} />}
                {breadcrumbsProps && (
                    <Row justifyContent="center">
                        <Breadcrumbs {...breadcrumbsProps} />
                    </Row>
                )}
            </Col>
            <KeyboardAwareScrollView
                style={{ marginHorizontal: -20, flex: 1 }}
                //contentContainerStyle={!scrollable && { flex: 1, justifyContent: "flex-end" }}
                //scrollEnabled={!!scrollable}
                extraScrollHeight={0}
                keyboardShouldPersistTaps="handled"
                enableOnAndroid={true}
                alwaysBounceVertical={false}
            >
                <GlassNavigatorContent flex={1} justifyContent="flex-end">
                    {children}
                </GlassNavigatorContent>
            </KeyboardAwareScrollView>
        </Col>
    </Glass>
);

export default GlassNavigator;
