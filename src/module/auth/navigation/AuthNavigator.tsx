import { NavigationContainer } from "@react-navigation/native";
import { View, Text } from "react-native";
import Stack from "stack-navigator";
import LoginPage from "../page/LoginPage/LoginPage";
import LogoPage from "../page/LogoPage/LogoPage";
import { AuthScreen } from "./AuthGroup";

const Element = (): JSX.Element => {
    return (<Text>hola</Text>)
}

const AuthNavigator = (): JSX.Element => {
    return (
        <LogoPage>
                <Stack.Group>
                    <Stack.Screen name={"Settings"} component={Element} />
                </Stack.Group>
        </LogoPage>
    );
};

export default AuthNavigator;
