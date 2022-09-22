import { AuthScreens } from "module/auth/AuthNavigatorGroup";
import { AnimatedAuthSwitchScreenRoot, CreatWalletButton, TouchableText } from "./AuthSwitchScreen.styles";
import { Col, Typography, useTabs } from "@peersyst/react-native-components";
import { useLogoPageFlex } from "module/common/component/layout/LogoPage/LogoPageContext";
import { useTranslate } from "module/common/hook/useTranslate";

const AuthSwitchScreen = (): JSX.Element => {
    const setTab = useTabs()[1];
    useLogoPageFlex(1);
    const translate = useTranslate();
    return (
        <AnimatedAuthSwitchScreenRoot in={true} appear>
            <CreatWalletButton onPress={() => setTab(AuthScreens.CREATE_WALLET)}>{translate("create_wallet")}</CreatWalletButton>
            <Col>
                <Typography variant="body1" textAlign="center">
                    {translate("already_have_wallet")}
                </Typography>
                <TouchableText variant="body1" textAlign="center" onPress={() => setTab(AuthScreens.IMPORT_WALLET)}>
                    {translate("import_it")}
                </TouchableText>
            </Col>
        </AnimatedAuthSwitchScreenRoot>
    );
};

export default AuthSwitchScreen;
