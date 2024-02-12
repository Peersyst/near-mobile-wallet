import { Col } from "@peersyst/react-native-components";
import { config } from "config";
import Button from "module/common/component/input/Button/Button";
import { MainScreens } from "module/common/component/navigation/MainNavigatorGroup/MainScreens";
import useNavigation from "module/common/hook/useNavigation";
import useTranslate from "module/common/hook/useTranslate";
import OrderSuccess from "module/fiatorders/components/feedback/OrderSuccess/OrderSuccess";
import BaseMainScreen from "module/main/component/layout/BaseMainScreen/BaseMainScreen";

const BuySuccessScreen = (): JSX.Element => {
    const translate = useTranslate();
    const navigate = useNavigation().navigate;

    return (
        <BaseMainScreen title={translate("buy").toLocaleUpperCase() + " " + config.tokenName} back>
            <Col flex={1} justifyContent="space-between" style={{ padding: 20 }}>
                <OrderSuccess
                    title={translate("cryptoWithFiatPurchaseCompleted")}
                    subtitle={translate("cryptoWithFiatPurchaseCompletedMessage")}
                    style={{ flex: 1 }}
                />
                <Button fullWidth onPress={() => navigate(MainScreens.MAIN)}>
                    {translate("close")}
                </Button>
            </Col>
        </BaseMainScreen>
    );
};

export default BuySuccessScreen;
