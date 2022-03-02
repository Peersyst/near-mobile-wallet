import LogoPage from "../../../common/component/layout/LogoPage/LogoPage";
import { AuthSwitchPageRoot, CreatWalletButton, TouchableText } from "./AuthSwitchPage.styles";
import { translate } from "locale";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "stack-navigator";
import { Col, Typography } from "react-native-components";

export interface TouchableTextProps {
    pressed: boolean;
}

const AuthSwitchPage = (): JSX.Element => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

    return (
        <LogoPage>
            <AuthSwitchPageRoot>
                <CreatWalletButton onPress={() => navigation.navigate("CreateWallet")}>{translate("create_wallet")}</CreatWalletButton>
                <Col>
                    <Typography variant="body1" textAlign="center">
                        {translate("already_have_wallet")}
                    </Typography>
                    <TouchableText variant="body1" textAlign="center" onPress={() => navigation.navigate("ImportWallet")}>
                        {translate("import_it")}
                    </TouchableText>
                </Col>
            </AuthSwitchPageRoot>
        </LogoPage>
    );
};

export default AuthSwitchPage;
