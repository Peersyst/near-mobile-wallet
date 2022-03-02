import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import LogoPage from "module/common/component/layout/LogoPage/LogoPage";
import { useEffect } from "react";
import { Typography } from "react-native-components";
import { RootStackParamsList } from "stack-navigator";
import { WelcomeBackPageRoot } from "./WelcomeBackPage.styles";
import { translate } from "locale";

const WelcomeBackPage = (): JSX.Element => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>();
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
