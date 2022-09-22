import { useEffect } from "react";
import { Typography, useSetTab } from "@peersyst/react-native-components";
import { WelcomeBackScreenRoot } from "./WelcomeBackScreen.styles";
import { AuthScreens } from "module/auth/AuthNavigatorGroup";
<<<<<<< HEAD
=======
import { useTranslate } from "module/common/hook/useTranslate";
>>>>>>> 0cb4c9a914b05a7195c3cea0cfcbf4f9382fcc5f
import { useLogoPageFlex, useLogoPageGradient } from "module/common/component/layout/LogoPage/LogoPageContext";
import { useTranslate } from "module/common/hook/useTranslate";

const WelcomeBackScreen = (): JSX.Element => {
    const setTab = useSetTab();
    useLogoPageFlex(1);
    useLogoPageGradient(true);

    const translate = useTranslate();
    useEffect(() => {
        setTimeout(() => setTab(AuthScreens.INTRODUCE_PIN), 3000);
    }, []);

    return (
        <WelcomeBackScreenRoot>
            <Typography variant="body1Strong">{translate("welcome_back")}</Typography>
        </WelcomeBackScreenRoot>
    );
};

export default WelcomeBackScreen;
