import Stack from "stack-navigator";
import LoginPage from "../page/LoginPage/LoginPage";
import AuthNavigator from "./AuthNavigator";

export enum AuthScreen {
    LOGIN = "Login",
    AUTH = "Auth",
}

export const Auth = (
    <>
        <Stack.Screen name={AuthScreen.LOGIN} component={AuthNavigator} />
    </>
);
