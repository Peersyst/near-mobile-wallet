import BaseSecondaryScreen from "module/common/component/layout/BaseSecondaryScreen/BaseSecondaryScreen";
import { Col } from "@peersyst/react-native-components";
import SelectFiat from "../components/core/SelectFiat/SelectFiat";
import SelectLocale from "../components/core/SelectLocale/SelectLocale";
import SelectNetwork from "../components/core/SelectNetwork/SelectNetwork";
import useTranslate from "module/common/hook/useTranslate";
import SwitchTheme from "../components/core/SwitchTheme/SwitchTheme";

const GeneralSettingsScreen = (): JSX.Element => {
    const translate = useTranslate();

    return (
        <BaseSecondaryScreen title={translate("general_settings")} back>
            <Col gap={10}>
                <SwitchTheme />
                <SelectNetwork />
                <SelectFiat />
                <SelectLocale />
            </Col>
        </BaseSecondaryScreen>
    );
};

export default GeneralSettingsScreen;
