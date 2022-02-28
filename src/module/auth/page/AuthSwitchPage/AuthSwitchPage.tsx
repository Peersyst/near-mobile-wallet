import LogoPage from "../LogoPage/LogoPage";
import { AuthSwitchPageRoot, CreatWalletButton, ImportRoot } from "./AuthSwitchPage.style";
import { translate } from "locale";
import { Typography } from "react-native-components";
import { TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "stack-navigator";

const AuthSwitchPage = (): JSX.Element => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>();
    return (
        <LogoPage>
            <AuthSwitchPageRoot>
                <CreatWalletButton onPress={() => navigation.navigate("CreateWallet")}>
                    {translate("create_wallet")}
                </CreatWalletButton>
                <ImportRoot>
                    <Typography variant="body1" style={{ textAlign: "center" }}>
                        {translate("already_have_wallet")}
                    </Typography>
                    <TouchableWithoutFeedback>
                        <Typography variant="body1" style={{ textAlign: "center", fontWeight: "bold" }}>
                            {translate("import_it")}
                        </Typography>
                    </TouchableWithoutFeedback>
                </ImportRoot>
            </AuthSwitchPageRoot>
        </LogoPage>
    );
};

export default AuthSwitchPage;
