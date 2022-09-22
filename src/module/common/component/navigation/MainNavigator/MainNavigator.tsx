import { NavbarProps } from "module/common/component/navigation/Navbar/Navbar.types";
import { ReactNode } from "react";
import Navbar from "module/common/component/navigation/Navbar/Navbar";
import { ViewStyle } from "react-native";
import { MainNavigatorContent, MainNavigatorNavWrapper, MainNavigatorRoot } from "./MainNavigator.styles";
import { Divider } from "@peersyst/react-native-components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export interface MainNavigatorProps {
    navbar?: NavbarProps;
    children?: ReactNode;
    style?: ViewStyle;
}

const MainNavigator = ({ navbar: navbarProps, children, style }: MainNavigatorProps): JSX.Element => (
    <MainNavigatorRoot style={style} onStartShouldSetResponder={() => true}>
        <MainNavigatorNavWrapper>{navbarProps && <Navbar {...navbarProps} />}</MainNavigatorNavWrapper>
        <Divider />
        <KeyboardAwareScrollView
            style={{ flex: 1 }}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid={true}
            alwaysBounceVertical={false}
        >
            <MainNavigatorContent flex={1} justifyContent="flex-end">
                {children}
            </MainNavigatorContent>
        </KeyboardAwareScrollView>
    </MainNavigatorRoot>
);

export default MainNavigator;
