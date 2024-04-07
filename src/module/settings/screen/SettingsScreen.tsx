import BaseSecondaryScreen from "module/common/component/layout/BaseSecondaryScreen/BaseSecondaryScreen";
import SettingsTabs from "../navigation/SettingsTabs";

const SettingsScreen = (): JSX.Element => {
    return (
        <BaseSecondaryScreen childrenStyle={{ padding: 0 }}>
            <SettingsTabs />
        </BaseSecondaryScreen>
    );
};

export default SettingsScreen;
