import { MainTabItemType } from "module/main/component/navigation/MainTabs/MainTabs.types";
import useTranslate from "module/common/hook/useTranslate";
import MainTabs from "module/main/component/navigation/MainTabs/MainTabs";
import GeneralSettingsScreen from "../screen/GeneralSettingsScreen";
import SecuritySettingsScreen from "../screen/SecuritySettingsScreen";
import styled from "@peersyst/react-native-styled";

const SettingsTabsRoot = styled(MainTabs)(({ theme: { palette } }) => ({
    tabGroup: {
        background: palette.background,
    },
}));

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
    return <SettingsTabsRoot tabs={SettingTabs} backgroundColor={true} />;
};

export default SettingsTabs;
