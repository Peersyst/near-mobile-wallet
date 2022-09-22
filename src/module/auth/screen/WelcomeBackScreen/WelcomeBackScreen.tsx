import { useEffect } from "react";
import { Typography, useSetTab } from "@peersyst/react-native-components";
import { WelcomeBackScreenRoot } from "./WelcomeBackScreen.styles";
import { translate } from "locale";
import { AuthScreens } from "module/auth/AuthNavigatorGroup";
import { useLogoPageFlex, useLogoPageGradient } from "module/common/component/layout/LogoPage/LogoPageContext";

const WelcomeBackScreen = (): JSX.Element => {
    const setTab = useSetTab();
    useLogoPageFlex(1);
    useLogoPageGradient(true);

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
