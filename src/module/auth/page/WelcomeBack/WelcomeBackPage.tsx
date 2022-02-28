import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import LogoPage from "module/auth/page/LogoPage/LogoPage";
import { useEffect } from "react";
import { Typography } from "react-native-components";
import { RootStackParamsList } from "stack-navigator";
import { WelcomeBackPageRoot } from "./WelcomeBackPage.styles";

const WelcomeBackPage = (): JSX.Element => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>();
    useEffect(() => {
        const goToHome = async () => {
            await new Promise((resolve) => setTimeout(resolve, 3000));
            navigation.navigate("Home");
        };
        goToHome();
    }, []);
    return (
        <LogoPage>
            <WelcomeBackPageRoot>
                <Typography variant="body1">Welcome back</Typography>
            </WelcomeBackPageRoot>
        </LogoPage>
    );
};

export default WelcomeBackPage;
