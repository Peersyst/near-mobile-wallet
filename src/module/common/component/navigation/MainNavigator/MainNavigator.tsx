import { NavbarProps } from "module/common/component/navigation/Navbar/Navbar.types";
import { BreadcrumbsProps } from "module/common/component/display/Breadcrumbs/Breadcrumbs.types";
import { ReactNode } from "react";
import Navbar from "module/common/component/navigation/Navbar/Navbar";
import { ScrollView } from "react-native";
import { ViewStyle } from "react-native";
import { MainNavigatorContent, MainNavigatorDivider, MainNavigatorNavWrapper, MainNavigatorRoot } from "./MainNavigator.styles";
import { Divider } from "@peersyst/react-native-components";

export interface MainNavigatorProps {
    navbar?: NavbarProps;
    children?: ReactNode;
    scrollable?: boolean;
    style?: ViewStyle;
}

const MainNavigator = ({ navbar: navbarProps, children, scrollable, style }: MainNavigatorProps): JSX.Element => (
    <MainNavigatorRoot style={style}>
        <MainNavigatorNavWrapper>{navbarProps && <Navbar {...navbarProps} />}</MainNavigatorNavWrapper>
        <Divider />
        <ScrollView contentContainerStyle={!scrollable && { flex: 1, justifyContent: "flex-end" }} scrollEnabled={!!scrollable}>
            <MainNavigatorContent onStartShouldSetResponder={() => true} flex={1} justifyContent="flex-end">
                {children}
            </MainNavigatorContent>
        </ScrollView>
    </MainNavigatorRoot>
);

export default MainNavigator;
