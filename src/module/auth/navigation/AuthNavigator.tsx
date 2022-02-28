import Stack from "stack-navigator";
import LoginPage from "../page/LoginPage/LoginPage";
import LogoPage from "../page/LogoPage/LogoPage";

export enum AuthScreen {
    LOADER = "Loader",
    LOGIN = "Login",
}

export const AuthNavigator = (
    <>
        <Stack.Screen name={AuthScreen.LOGIN} component={LoginPage} />
        <Stack.Screen name={AuthScreen.LOADER} component={LogoPage} />
    </>
);
