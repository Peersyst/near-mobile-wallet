import useGetSettingsTabs from "./useGetSettingsTabs";
import BaseTabsScreen from "module/common/component/layout/BaseTabsScreen/BaseTabsScreen";

const SettingsScreen = (): JSX.Element => {
    const { settingsTabs } = useGetSettingsTabs();

    return <BaseTabsScreen tabs={settingsTabs} />;
};

export default SettingsScreen;
