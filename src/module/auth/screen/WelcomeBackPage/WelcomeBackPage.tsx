import { useEffect } from "react";
import { Typography } from "react-native-components";
import { WelcomeBackPageRoot } from "./WelcomeBackPage.styles";
import { translate } from "locale";
import useNavigation from "module/common/hook/useNavigation";
import LogoPage from "module/common/component/layout/LogoPage/LogoPage";

const WelcomeBackPage = (): JSX.Element => {
    const navigation = useNavigation();
    useEffect(() => {
        new Promise((resolve) => setTimeout(resolve, 3000)).then(() => navigation.navigate("Main"));
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
