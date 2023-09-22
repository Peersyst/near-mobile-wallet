import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainScreens } from "module/common/component/navigation/MainNavigatorGroup/MainScreens";
import { HomeScreenParams } from "module/home/screen/HomeScreen.types";

export type MainStackParamsList = {
    //Main
    [MainScreens.MAIN]: undefined;
    [MainScreens.SETTINGS]: undefined;
    [MainScreens.FIAT_ORDERS]: undefined;
    [MainScreens.HOME]: HomeScreenParams;
    [MainScreens.NEWS]: undefined;
    [MainScreens.STAKING]: undefined;
    [MainScreens.DAPPS]: undefined;
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
