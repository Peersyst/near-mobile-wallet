import { MainBottomBarItemBackgroundGradiend, MainBottomBarItemRoot } from "./MainBottomBarItem.styles";
import { Col } from "@peersyst/react-native-components";
import { useEffect, useRef } from "react";
import useThemeMode from "module/common/hook/useThemeMode";
import { theme } from "config/theme/theme";
import useWalletGradient from "module/wallet/hook/useWalletGradient";
import { Animated, ViewStyle } from "react-native";
import { NearIcon } from "icons";

export interface MainBottomBarItemProps {
    onPress: () => void;
    style?: ViewStyle;
}

const MainBottomBarItem = (props: MainBottomBarItemProps): JSX.Element => {
    const mode = useThemeMode();

    const textColor = mode === "light" ? theme.palette.background : theme.palette.text;

    const walletGradient = useWalletGradient();

    const gradientAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.timing(gradientAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, []);

    const backgroundColor = walletGradient[0];
    const secondaryBackgroundColor = walletGradient[1];

    return (
        <MainBottomBarItemRoot {...props}>
            <Col flex={1} justifyContent="center" alignItems="center">
                <NearIcon style={{ color: textColor, fontSize: 28 }} />
            </Col>
            <MainBottomBarItemBackgroundGradiend
                colors={[backgroundColor, secondaryBackgroundColor]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={{
                    transform: [{ translateX: gradientAnim }],
                }}
            />
        </MainBottomBarItemRoot>
    );
};

export default MainBottomBarItem;
