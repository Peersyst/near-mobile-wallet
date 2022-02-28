import Stack from "stack-navigator";
import AuthSwitchPage from "../page/AuthSwitchPage/AuthSwitchPage";
import CreateWalletPage from "../page/CreateWalletPage/CreateWalletPage";
import ImportWalletPage from "../page/ImportWalletPage/ImportWalletPage";
import LoginPage from "../page/LoginPage/LoginPage";

export enum AuthScreen {
    LOGIN = "Login",
    AUTH_SWITCH = "AuthSwitch",
    IMPORT_WALLET = "ImportWallet",
    CREATE_WALLET = "CreateWallet",
}

export const AuthNavigatorGroup = (
    <Stack.Group >
        <Stack.Screen name={AuthScreen.AUTH_SWITCH} component={AuthSwitchPage} />
        <Stack.Screen name={AuthScreen.LOGIN} component={LoginPage} />
        <Stack.Screen name={AuthScreen.IMPORT_WALLET} component={ImportWalletPage} />
        <Stack.Screen name={AuthScreen.CREATE_WALLET} component={CreateWalletPage} />
    </Stack.Group>
);
