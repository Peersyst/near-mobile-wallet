import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type MainStackParamsList = {
    //Main
    Main: undefined;
    Home: undefined;
    Settings: undefined;
    GeneralSettings: undefined;
    SecuritySettings: undefined;
    DAO: undefined;
    News: undefined;
};
export type RootStackParamsList = {
    //Auth
    Login: undefined;
    AuthSwitch: undefined;
    CreateWallet: undefined;
    ImportWallet: undefined;
} & MainStackParamsList;

export const BottomTab = createBottomTabNavigator<MainStackParamsList>();

export default createNativeStackNavigator<RootStackParamsList>();
