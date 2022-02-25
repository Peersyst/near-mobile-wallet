import { DashboardNavigator } from "module/dashboard/DashboardNavigator";
import { NavigationContainer } from "@react-navigation/native";
import Stack from "stack-navigator";
import { AuthNavigator, AuthScreen } from "module/auth/navigation/AuthNavigator";

const Navigator = (): JSX.Element => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName={AuthScreen.LOGIN} screenOptions={{ headerShown: false }}>
            {DashboardNavigator}
            {AuthNavigator}
        </Stack.Navigator>
    </NavigationContainer>
);

export default Navigator;
