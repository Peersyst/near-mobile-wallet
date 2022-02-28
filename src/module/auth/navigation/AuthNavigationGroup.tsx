import Stack from "stack-navigator";
import AuthSwitchPage from "../page/AuthSwitchPage/AuthSwitchPage";
import LoginPage from "../page/LoginPage/LoginPage";

export enum AuthScreen {
    LOGIN = "Login",
    AUTH_SWITCH = "AuthSwitch",
}

export const AuthNavigatorGroup = (
    <Stack.Group>
         <Stack.Screen name={AuthScreen.AUTH_SWITCH} component={AuthSwitchPage} />
        <Stack.Screen name={AuthScreen.LOGIN} component={LoginPage} />
    </Stack.Group>
);
