import LogoPage from "../LogoPage/LogoPage";
import { AuthSwitchPageRoot, CreatWalletButton, ImportRoot, InfoText, TouchableText } from "./AuthSwitchPage.style";
import { translate } from "locale";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "stack-navigator";
import { useState } from "react";

export interface TouchableTextProps {
    pressed: boolean;
}

const AuthSwitchPage = (): JSX.Element => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamsList>>();
    const [pressed, setPressed] = useState<boolean>(false);
    return (
        <LogoPage>
            <AuthSwitchPageRoot>
                <CreatWalletButton onPress={() => navigation.navigate("CreateWallet")}>{translate("create_wallet")}</CreatWalletButton>
                <ImportRoot>
                    <InfoText variant="body1">{translate("already_have_wallet")}</InfoText>
                    <Pressable
                        onPressIn={() => setPressed(true)}
                        onPressOut={() => setPressed(false)}
                        onPress={() => navigation.navigate("ImportWallet")}
                    >
                        <TouchableText variant="body1" pressed={pressed}>
                            {translate("import_it")}
                        </TouchableText>
                    </Pressable>
                </ImportRoot>
            </AuthSwitchPageRoot>
        </LogoPage>
    );
};

export default AuthSwitchPage;
