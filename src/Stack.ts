import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type MainStackParamsList = {
    //Main
    Main: undefined;
    Settings: undefined;
    FiatOrders: undefined;
    Home: undefined;
    News: undefined;
    Staking: undefined;
    DApps: undefined;
};
export type SettingsStackParamsList = {
    //Settings
    SettingsMenu: undefined;
    GeneralSettings: undefined;
    SecuritySettings: undefined;
};
export type FiatOrdersStackParamsList = {
    //BuyCrypto
    Buy: undefined;
    BuySuccess: undefined;
};

export type AuthStackParamsList = {
    //Auth
    Login: undefined;
    AuthSwitch: undefined;
    CreateWallet: undefined;
    ImportWallet: undefined;
};
export type RootStackParamsList = AuthStackParamsList & MainStackParamsList & SettingsStackParamsList & FiatOrdersStackParamsList;

export const BottomTab = createBottomTabNavigator<MainStackParamsList>();
export const SettingTab = createNativeStackNavigator<SettingsStackParamsList>();
export const FiatOrderTab = createNativeStackNavigator<FiatOrdersStackParamsList>();

export default createNativeStackNavigator<RootStackParamsList>();
