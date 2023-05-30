import { config } from "config";
import { useTranslate } from "module/common/hook/useTranslate";
import BuyWithTransak from "module/fiatorders/components/core/BuyWithTransak/BuyWithTransak";
import BaseMainScreen from "module/main/component/layout/BaseMainScreen/BaseMainScreen";

const BuyScreen = (): JSX.Element => {
    const translate = useTranslate();
    return (
        <BaseMainScreen title={translate("buy").toLocaleUpperCase() + " " + config.tokenName} back>
            <BuyWithTransak />
        </BaseMainScreen>
    );
};

export default BuyScreen;
