import { AnimatedAuthSwitchScreenRoot } from "./AuthSwitchScreen.styles";
import { useTabs } from "@peersyst/react-native-components";
import { useLogoPageFlex, useLogoPageGradient } from "module/common/component/layout/LogoPage/LogoPageContext";
import useTranslate from "module/common/hook/useTranslate";
import Button from "module/common/component/input/Button/Button";
import DarkThemeProvider from "module/common/component/util/ThemeProvider/DarkThemeProvider";
import { AuthScreens } from "module/auth/AuthNavigatorGroup.types";

const AuthSwitchScreen = (): JSX.Element => {
    const setTab = useTabs()[1];
    useLogoPageFlex(1);
    useLogoPageGradient(true);
    const translate = useTranslate();
    return (
        <DarkThemeProvider>
            <AnimatedAuthSwitchScreenRoot in={true} appear>
                <Button variant="secondary" size="lg" fullWidth onPress={() => setTab(AuthScreens.CREATE_WALLET)}>
                    {translate("create_wallet")}
                </Button>
                <Button variant="tertiary" size="lg" fullWidth onPress={() => setTab(AuthScreens.IMPORT_WALLET)}>
                    {translate("import-your-near-wallet")}
                </Button>
            </AnimatedAuthSwitchScreenRoot>
        </DarkThemeProvider>
    );
};

export default AuthSwitchScreen;
