import BasePage from "module/common/component/layout/BasePage/BasePage";
import LogoCol from "module/common/component/display/Logos/LogoCol/LogoCol";
import { LogoPageIconRoot } from "./LogoPage.styles";
import { ReactNode, useEffect, useRef, useState } from "react";
import { LogoPageProvider } from "module/common/component/layout/LogoPage/LogoPageContext";
import { Animated } from "react-native";

export interface LogoPageProps {
    children?: ReactNode;
}

const LogoPage = ({ children }: LogoPageProps): JSX.Element => {
    const [logoFlex, setLogoFlex] = useState(1);

    const logoAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.timing(logoAnim, {
            toValue: logoFlex,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [logoFlex, logoAnim]);

    return (
        <BasePage appearance="dark" header={false}>
            <LogoPageIconRoot style={{ flex: logoAnim }}>
                <LogoCol />
            </LogoPageIconRoot>
            <LogoPageProvider value={{ setLogoFlex }}>{children}</LogoPageProvider>
        </BasePage>
    );
};

export default LogoPage;
