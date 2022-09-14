import { useEffect } from "react";
import { Typography, useSetTab } from "@peersyst/react-native-components";
import { WelcomeBackScreenRoot } from "./WelcomeBackScreen.styles";
import { translate } from "locale";
import { AuthScreens } from "module/auth/AuthNavigatorGroup";

const WelcomeBackScreen = (): JSX.Element => {
    const setTab = useSetTab();
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
