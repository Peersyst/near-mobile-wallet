import { translate } from "locale";
import BaseSecondaryScreen from "module/common/component/layout/BaseSecondaryScreen/SecondaryPage";
import SettingsMenu from "../components/core/SettingsMenu/SettingsMenu";
import { Col } from "react-native-components";
import { BottomTabScreenNavigatonProps } from "module/main/component/navigation/MainBottomNavigatorGroup/MainBottomNavigatorGroup.types";

const SettingsScreen = ({ navigation }: BottomTabScreenNavigatonProps): JSX.Element => {
    return (
        <BaseSecondaryScreen title={translate("settings")} back={false} navigation={navigation}>
            <Col gap={50}>
                <SettingsMenu label="General Settings" location="GeneralSettings" />
                <SettingsMenu label="Security Settings" location="Settings" />
            </Col>
        </BaseSecondaryScreen>
    );
};

export default SettingsScreen;
