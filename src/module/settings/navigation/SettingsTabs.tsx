import { MainTabItemType } from "module/main/component/navigation/MainTabs/MainTabs.types";
import useTranslate from "module/common/hook/useTranslate";
import GeneralSettingsScreen from "../screen/GeneralSettingsScreen";
import SecuritySettingsScreen from "../screen/SecuritySettingsScreen";
import { SettingsTabsRoot } from "./SettingsTabs.styles";

const SettingsTabs = (): JSX.Element => {
    const translate = useTranslate();
    const SettingTabs: MainTabItemType[] = [
        {
            title: translate("general_settings"),
            item: <GeneralSettingsScreen />,
        },
        {
            title: translate("security_settings"),
            item: <SecuritySettingsScreen />,
        },
    ];
    return <SettingsTabsRoot tabs={SettingTabs} />;
};

export default SettingsTabs;
