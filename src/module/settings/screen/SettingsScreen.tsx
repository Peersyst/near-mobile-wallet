import BaseSecondaryScreen from "module/common/component/layout/BaseSecondaryScreen/BaseSecondaryScreen";
import { Col } from "@peersyst/react-native-components";
import SettingsMenu from "module/settings/components/input/SettingsMenu/SettingsMenu";
import { useTranslate } from "module/common/hook/useTranslate";
import { SettingsScreens } from "../components/navigation/SettingsNavigatorGroup/SettingsNavigatorGroup";

const SettingsScreen = (): JSX.Element => {
    const translate = useTranslate();

    return (
        <BaseSecondaryScreen title={translate("settings")} back>
            <Col gap={10}>
                <SettingsMenu label={translate("general_settings")} location={SettingsScreens.GENERAL_SETTINGS} />
                <SettingsMenu label={translate("security_settings")} location={SettingsScreens.SECURITY_SETTINGS} />
            </Col>
        </BaseSecondaryScreen>
    );
};

export default SettingsScreen;
