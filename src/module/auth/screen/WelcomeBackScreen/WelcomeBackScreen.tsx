import { useEffect } from "react";
import { Typography, useSetTab } from "@peersyst/react-native-components";
import { WelcomeBackScreenRoot } from "./WelcomeBackScreen.styles";
import { AuthScreens } from "module/auth/AuthNavigatorGroup";
import { useTranslate } from "module/common/hook/useTranslate";

const WelcomeBackScreen = (): JSX.Element => {
    const setTab = useSetTab();
    const translate = useTranslate();
    useEffect(() => {
        setTimeout(() => setTab(AuthScreens.INTRODUCE_PIN), 3000);
    }, []);

    return (
        <WelcomeBackScreenRoot>
            <Typography variant="body1">{translate("welcome_back")}</Typography>
        </WelcomeBackScreenRoot>
    );
};

export default WelcomeBackScreen;
