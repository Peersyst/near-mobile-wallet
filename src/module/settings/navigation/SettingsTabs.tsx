import { MainTabItemType } from "module/main/component/navigation/MainTabs/MainTabs.types";
import useTranslate from "module/common/hook/useTranslate";
import MainTabs from "module/main/component/navigation/MainTabs/MainTabs";
import GeneralSettingsScreen from "../screen/GeneralSettingsScreen";
import SecuritySettingsScreen from "../screen/SecuritySettingsScreen";

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
    return <MainTabs tabs={SettingTabs} backgroundColor={true} />;
};

export default SettingsTabs;
