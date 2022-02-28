import Stack from "stack-navigator";
import LoginPage from "../page/LoginPage/LoginPage";

export enum AuthScreen {
    LOGIN = "Login",
    AUTH = "Auth",
}

export const AuthNavigatorGroup = (
    <Stack.Group>
        <Stack.Screen name={AuthScreen.LOGIN} component={LoginPage} />
    </Stack.Group>
);
