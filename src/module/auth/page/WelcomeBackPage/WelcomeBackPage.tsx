import LogoPage from "module/auth/page/LogoPage/LogoPage";
import { useEffect } from "react";
import { Typography } from "react-native-components";
import { WelcomeBackPageRoot } from "./WelcomeBackPage.styles";
import { translate } from "locale";
import useNativeNavigation from "module/common/component/navigation/hooks/useNavigation";

const WelcomeBackPage = (): JSX.Element => {
    const navigation = useNativeNavigation();
    useEffect(() => {
        new Promise((resolve) => setTimeout(resolve, 3000)).then(() => navigation.navigate("Home"));
    }, [navigation]);
    return (
        <LogoPage>
            <WelcomeBackPageRoot>
                <Typography variant="body1">{translate("welcome_back")}</Typography>
            </WelcomeBackPageRoot>
        </LogoPage>
    );
};

export default WelcomeBackPage;
