import PasswordCircle from "module/common/component/display/PasswordCircle/PasswordCircle";
import { Text, SafeAreaView, StatusBar } from "react-native";

const LoginPage = (): JSX.Element => {
    return (
        <SafeAreaView style={{ marginTop: StatusBar.currentHeight, backgroundColor: "black", height: "100%"}}>
            <Text>hola</Text>
            <PasswordCircle />
        </SafeAreaView>
    );
};

export default LoginPage;
