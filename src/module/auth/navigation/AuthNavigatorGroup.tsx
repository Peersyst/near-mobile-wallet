import Stack from "stack-navigator";
import AuthSwitchPage from "../page/AuthSwitchPage/AuthSwitchPage";
import CreateWalletPage from "../page/CreateWalletPage/CreateWalletPage";
import ImportWalletPage from "../page/ImportWalletPage/ImportWalletPage";
import LoginPage from "../page/LoginPage/LoginPage";

export enum AuthScreens {
    LOGIN = "Login",
    AUTH_SWITCH = "AuthSwitch",
    IMPORT_WALLET = "ImportWallet",
    CREATE_WALLET = "CreateWallet",
}

const AuthNavigatorGroup = (
    <Stack.Group>
        <Stack.Screen name={AuthScreens.AUTH_SWITCH} component={AuthSwitchPage} />
        <Stack.Screen name={AuthScreens.LOGIN} component={LoginPage} />
        <Stack.Screen name={AuthScreens.IMPORT_WALLET} component={ImportWalletPage} />
        <Stack.Screen name={AuthScreens.CREATE_WALLET} component={CreateWalletPage} />
    </Stack.Group>
);

export default AuthNavigatorGroup;
