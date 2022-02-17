import PasswordLayout from "module/common/component/layout/PasswordLayout/PasswordLayout";
import { Text, SafeAreaView, StatusBar } from "react-native";

const LoginPage = (): JSX.Element => {
    return (
        <SafeAreaView style={{ marginTop: StatusBar.currentHeight, backgroundColor: "black", height: "100%"}}>
            <Text>hola</Text>
            <PasswordLayout />
        </SafeAreaView>
    );
};

export default LoginPage;
