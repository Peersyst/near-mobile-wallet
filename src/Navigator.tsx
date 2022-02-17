import { DashboardNavigator, DashboardScreens } from "module/dashboard/DashboardNavigator";
import { NavigationContainer } from "@react-navigation/native";
import Stack from "stack-navigator";
import { AuthNavigator } from "module/auth/navigation/AuthNavigator";


const Navigator = (): JSX.Element => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName={DashboardScreens.MAIN} screenOptions={{ headerShown: false }}>
            {DashboardNavigator}
            {AuthNavigator}
        </Stack.Navigator>
    </NavigationContainer>
);

export default Navigator;
