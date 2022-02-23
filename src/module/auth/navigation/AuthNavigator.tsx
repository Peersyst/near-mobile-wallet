import Stack from "stack-navigator";
import LoginPage from "../page/LoginPage/LoginPage";

export enum AuthScreen {
    LOGIN = "Login",
}

export const AuthNavigator = (
    <>
        <Stack.Screen name={AuthScreen.LOGIN} component={LoginPage} />
    </>
);
