import PasswordLayout from "module/common/component/layout/PasswordLayout/PasswordLayout";
//import { useState } from "react";
import { Text, SafeAreaView, StatusBar } from "react-native";

const LoginPage = (): JSX.Element => {
    //const [password, setPassword] = useState("");
    return (
        <SafeAreaView style={{ marginTop: StatusBar.currentHeight, backgroundColor: "black", height: "100%"}}>
            <Text>hola</Text>
            <PasswordLayout activated={2} />
        </SafeAreaView>
    );
};

export default LoginPage;
