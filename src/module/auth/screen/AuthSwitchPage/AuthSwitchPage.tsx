import { AuthScreens } from "module/auth/AuthNavigatorGroup";
import { AnimatedAuthSwitchPageRoot, CreatWalletButton, TouchableText } from "./AuthSwitchPage.styles";
import { translate } from "locale";
import { Col, Typography, useTabs } from "react-native-components";
import { useLogoPageFlex } from "module/common/component/layout/LogoPage/LogoPageContext";

export interface TouchableTextProps {
    pressed: boolean;
}

const AuthSwitchPage = (): JSX.Element => {
    const setTab = useTabs()[1];
    useLogoPageFlex(1);

    return (
        <AnimatedAuthSwitchPageRoot in={true} appear>
            <CreatWalletButton onPress={() => setTab(AuthScreens.CREATE_WALLET)}>{translate("create_wallet")}</CreatWalletButton>
            <Col>
                <Typography variant="body1" textAlign="center">
                    {translate("already_have_wallet")}
                </Typography>
                <TouchableText variant="body1" textAlign="center" onPress={() => setTab(AuthScreens.IMPORT_WALLET)}>
                    {translate("import_it")}
                </TouchableText>
            </Col>
        </AnimatedAuthSwitchPageRoot>
    );
};

export default AuthSwitchPage;
