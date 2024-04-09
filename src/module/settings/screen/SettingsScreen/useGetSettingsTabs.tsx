import useTranslate from "module/common/hook/useTranslate";
import { MainTabItemType } from "module/main/component/navigation/MainTabs/MainTabs.types";
import GeneralSettingsScreen from "../GeneralSettingsScreen";
import SecuritySettingsScreen from "../SecuritySettingsScreen";

export interface useGetSettingsTabsReturn {
    settingsTabs: MainTabItemType[];
}

export default function useGetSettingsTabs(): useGetSettingsTabsReturn {
    const translate = useTranslate();
    const settingsTabs: MainTabItemType[] = [
        {
            title: translate("general_settings"),
            item: <GeneralSettingsScreen />,
        },
        {
            title: translate("security_settings"),
            item: <SecuritySettingsScreen />,
        },
    ];
    return { settingsTabs };
}
