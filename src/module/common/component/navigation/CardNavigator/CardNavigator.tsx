import { NavbarProps } from "module/common/component/navigation/Navbar/Navbar.types";
import { ReactNode } from "react";
import Navbar from "module/common/component/navigation/Navbar/Navbar";
import { ViewStyle } from "react-native";
import { CardNavigatorContent, CardNavigatorRoot } from "./CardNavigator.styles";
import { Divider } from "@peersyst/react-native-components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export interface CardNavigatorProps {
    navbar?: NavbarProps;
    children?: ReactNode;
    style?: ViewStyle;
}

const CardNavigator = ({ navbar: navbarProps, children, style }: CardNavigatorProps): JSX.Element => (
    <CardNavigatorRoot style={style}>
        {navbarProps && <Navbar {...navbarProps} />}
        <Divider />
        <KeyboardAwareScrollView
            style={{ flex: 1 }}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid={true}
            alwaysBounceVertical={false}
        >
            <CardNavigatorContent flex={1} justifyContent="flex-end">
                {children}
            </CardNavigatorContent>
        </KeyboardAwareScrollView>
    </CardNavigatorRoot>
);

export default CardNavigator;
