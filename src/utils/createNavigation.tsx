import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigatorScreen } from "../Navigator";

const Stack = createNativeStackNavigator();

export function createNavigation(navigators: NavigatorScreen[][], initialRouteName?: string): JSX.Element {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false }}>
                {navigators.map((screens) =>
                    screens.map((screen, index) => <Stack.Screen key={index.toString()} name={screen.name} component={screen.component} />),
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
