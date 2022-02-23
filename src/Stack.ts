import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootStackParamsList = {
    Main: undefined;
    Settings: undefined;
    Notifications: undefined;
    Loader: undefined;
    Login: undefined;
};

export default createNativeStackNavigator<RootStackParamsList>();
