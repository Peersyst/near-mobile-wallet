import { DashboardNavigator, DashboardScreens } from "module/dashboard/DashboardNavigator";
import { NavigationContainer } from "@react-navigation/native";
import Stack from "stack-navigator";

const Navigator = (): JSX.Element => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName={DashboardScreens.MAIN} screenOptions={{ headerShown: false }}>
            {DashboardNavigator}
        </Stack.Navigator>
    </NavigationContainer>
);

export default Navigator;
