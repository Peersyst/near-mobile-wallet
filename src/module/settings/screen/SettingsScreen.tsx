import SettingsTabs from "../navigation/SettingsTabs";
import BaseTabsScreen from "module/common/component/layout/BaseTabsScreen/BaseTabsScreen";

const SettingsScreen = (): JSX.Element => {
    return (
        <BaseTabsScreen>
            <SettingsTabs />
        </BaseTabsScreen>
    );
};

export default SettingsScreen;
