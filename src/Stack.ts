import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type MainStackParamsList = {
    //Main
    Main: undefined;
    Settings: undefined;
    Home: undefined;
    DAO: undefined;
    News: undefined;
};
export type SettingsStackParamsList = {
    //Settings
    SettingsMenu: undefined;
    GeneralSettings: undefined;
    SecuritySettings: undefined;
};
export type RootStackParamsList = {
    //Auth
    Login: undefined;
    AuthSwitch: undefined;
    CreateWallet: undefined;
    ImportWallet: undefined;
} & MainStackParamsList &
    SettingsStackParamsList;

export const BottomTab = createBottomTabNavigator<MainStackParamsList>();
export const SettingTab = createNativeStackNavigator<SettingsStackParamsList>();

export default createNativeStackNavigator<RootStackParamsList>();
