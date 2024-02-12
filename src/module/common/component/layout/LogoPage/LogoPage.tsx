import { LogoPageIconRoot } from "./LogoPage.styles";
import { ReactNode, useEffect, useRef, useState } from "react";
import { LogoPageProvider } from "module/common/component/layout/LogoPage/LogoPageContext";
import { Animated, useWindowDimensions } from "react-native";
import Logo from "module/common/component/display/Logo/Logo";
import GradientPage from "module/common/component/layout/GradientPage/GradientPage";
import { ThemeProvider } from "@peersyst/react-native-styled";
import darkTheme from "refactor/ui/config/theme/darkTheme";

export interface LogoPageProps {
    children?: ReactNode;
}

const AnimatedLogoPageIconRoot = Animated.createAnimatedComponent(LogoPageIconRoot);

const LogoPage = ({ children }: LogoPageProps): JSX.Element => {
    const [logoFlex, setLogoFlex] = useState(1);
    const [gradient, setGradient] = useState(true);

    const logoAnim = useRef(new Animated.Value(1)).current;
    const { height } = useWindowDimensions();

    useEffect(() => {
        Animated.timing(logoAnim, {
            toValue: logoFlex,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [logoFlex, logoAnim]);

    return (
        <ThemeProvider theme={darkTheme}>
            <GradientPage gradient={gradient}>
                <AnimatedLogoPageIconRoot style={{ height: logoAnim.interpolate({ inputRange: [0, 1], outputRange: [0, height] }) }}>
                    <Logo />
                </AnimatedLogoPageIconRoot>
                <LogoPageProvider value={{ setLogoFlex, setGradient }}>{children}</LogoPageProvider>
            </GradientPage>
        </ThemeProvider>
    );
};

export default LogoPage;
