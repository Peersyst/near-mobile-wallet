import { useEffect } from "react";
import { Typography, useSetTab } from "@peersyst/react-native-components";
import { WelcomeBackScreenRoot } from "./WelcomeBackScreen.styles";
import { useLogoPageFlex, useLogoPageGradient } from "module/common/component/layout/LogoPage/LogoPageContext";
import useTranslate from "module/common/hook/useTranslate";
import DarkThemeProvider from "module/common/component/util/ThemeProvider/DarkThemeProvider";
import { AuthScreens } from "module/auth/AuthNavigatorGroup.types";

const WelcomeBackScreen = (): JSX.Element => {
    const setTab = useSetTab();
    useLogoPageFlex(1);
    useLogoPageGradient(true);

    const translate = useTranslate();
    useEffect(() => {
        setTimeout(() => setTab(AuthScreens.INTRODUCE_PIN), 3000);
    }, []);

    return (
        <DarkThemeProvider>
            <WelcomeBackScreenRoot>
                <Typography variant="body1Strong">{translate("welcome_back")}</Typography>
            </WelcomeBackScreenRoot>
        </DarkThemeProvider>
    );
};

export default WelcomeBackScreen;
