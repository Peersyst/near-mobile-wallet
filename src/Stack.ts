import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootStackParamsList = {
    Home: undefined;
    Settings: undefined;
    Notifications: undefined;
    Login: undefined;
    WelcomeBack: undefined;
};

export default createNativeStackNavigator<RootStackParamsList>();
