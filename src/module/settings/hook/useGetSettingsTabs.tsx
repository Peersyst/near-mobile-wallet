import useTranslate from "module/common/hook/useTranslate";
import { MainTabItemType } from "module/main/component/navigation/MainTabs/MainTabs.types";
import GeneralSettingsScreen from "../screen/GeneralSettingsScreen";
import SecuritySettingsScreen from "../screen/SecuritySettingsScreen";

export interface useGetSettingsTabsReturn {
    SettingTabs: MainTabItemType[];
}

export default function useGetSettingsTabs(): useGetSettingsTabsReturn {
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
    return { SettingTabs };
}
