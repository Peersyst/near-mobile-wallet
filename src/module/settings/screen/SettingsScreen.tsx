import useGetSettingsTabs from "../hook/useGetSettingsTabs";
import BaseTabsScreen from "module/common/component/layout/BaseTabsScreen/BaseTabsScreen";

const SettingsScreen = (): JSX.Element => {
    const { SettingTabs } = useGetSettingsTabs();
    return <BaseTabsScreen tabs={SettingTabs} />;
};

export default SettingsScreen;
