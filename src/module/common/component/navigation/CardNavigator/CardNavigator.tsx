import { NavbarProps } from "module/common/component/navigation/Navbar/Navbar.types";
import { ReactNode, useState } from "react";
import Navbar from "module/common/component/navigation/Navbar/Navbar";
import { LayoutChangeEvent, ViewStyle } from "react-native";
import { CardNavigatorContent, CardNavigatorRoot, CardNavigatorWrapper } from "./CardNavigator.styles";
import { Divider } from "@peersyst/react-native-components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDimensions } from "@react-native-community/hooks";

export interface CardNavigatorProps {
    navbar?: NavbarProps;
    children?: ReactNode;
    style?: ViewStyle;
}

const CardNavigator = ({ navbar: navbarProps, children, style }: CardNavigatorProps): JSX.Element => {
    const [keyboardPaddingEnabled, setKeyboardPaddingEnabled] = useState(false);
    const {
        screen: { height },
    } = useDimensions();

    const handleLayout = (e: LayoutChangeEvent) => {
        setKeyboardPaddingEnabled(e.nativeEvent.layout.height < height * 0.65);
    };

    return (
        <CardNavigatorRoot style={style} enabled={keyboardPaddingEnabled} behavior="padding">
            <CardNavigatorWrapper onLayout={handleLayout}>
                {navbarProps && <Navbar {...navbarProps} />}
                <Divider />
                <KeyboardAwareScrollView
                    style={{ flex: 1, height: "100%" }}
                    keyboardShouldPersistTaps="handled"
                    enableOnAndroid={true}
                    contentContainerStyle={{ flexGrow: 1 }}
                    alwaysBounceVertical={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                    enableAutomaticScroll={!keyboardPaddingEnabled}
                >
                    <CardNavigatorContent flex={1}>{children}</CardNavigatorContent>
                </KeyboardAwareScrollView>
            </CardNavigatorWrapper>
        </CardNavigatorRoot>
    );
};

export default CardNavigator;
