import Stack from "stack-navigator";
import LoginPage from "./LoginPage";

export enum LoginScreen {
    MAIN = "Login",
}

export const LoginNavigator = (
    <>
        <Stack.Screen name={LoginScreen.MAIN} component={LoginPage} />
    </>
);
