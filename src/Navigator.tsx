import { DashboardNavigator, DashboardScreens } from "module/dashboard/DashboardNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootStackParamsList = {
    Main: undefined;
    Settings: undefined;
    Notifications: undefined;
};

export const Stack = createNativeStackNavigator<RootStackParamsList>();

const Navigator = (): JSX.Element => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={DashboardScreens.MAIN} screenOptions={{ headerShown: false }}>
                {DashboardNavigator}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigator;
