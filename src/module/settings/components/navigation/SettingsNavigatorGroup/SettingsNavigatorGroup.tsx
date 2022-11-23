import { SettingTab } from "stack-navigator";
import SettingsScreen from "module/settings/screen/SettingsScreen";
import BasePage from "module/common/component/layout/BasePage/BasePage";
import GeneralSettingsScreen from "module/settings/screen/GeneralSettingsScreen";
import SecuritySettingsScreen from "module/settings/screen/SecuritySettingsScreen";

export enum SettingsScreens {
    SETTINGS = "SettingsMenu",
    GENERAL_SETTINGS = "GeneralSettings",
    SECURITY_SETTINGS = "SecuritySettings",
}

const SettingsNavigatorGroup = () => (
    <BasePage header={false}>
        <SettingTab.Navigator initialRouteName={SettingsScreens.SETTINGS} screenOptions={{ headerShown: false }}>
            <SettingTab.Screen name={SettingsScreens.SETTINGS} component={SettingsScreen} />
            <SettingTab.Screen name={SettingsScreens.GENERAL_SETTINGS} component={GeneralSettingsScreen} />
            <SettingTab.Screen name={SettingsScreens.SECURITY_SETTINGS} component={SecuritySettingsScreen} />
        </SettingTab.Navigator>
    </BasePage>
);

export default SettingsNavigatorGroup;
