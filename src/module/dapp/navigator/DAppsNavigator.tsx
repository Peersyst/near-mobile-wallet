import { DAppsTab } from "stack-navigator";
import DAppsScreen from "../screen/DappsScreen/DAppsScreen";
import { DAppScreens } from "./DAppsNavigator.types";
import BrowserScreen from "../screen/BrowserScreen/BrowserScreen";

/**
 * This component is used to force re-mount of the `BrowserScreen` component on each navigation.
 * createNativeStackNavigator provides with a Stack.Screen which does not have the unmountOnBlur prop.
 * On the other hand, createBottomTabNavigator it does have the unmountOnBlur prop.
 */
function BrowserScreenWithOnBlurOnMount() {
    return (
        <BrowserScreen
            // Force re-mount by changing key on each navigation
            key={Math.random().toString()}
        />
    );
}

export default function DAppsNavigator(): JSX.Element {
    return (
        <DAppsTab.Navigator initialRouteName={DAppScreens.HOME} screenOptions={{ headerShown: false }}>
            <DAppsTab.Screen name={DAppScreens.HOME} component={DAppsScreen} />
            <DAppsTab.Screen name={DAppScreens.WEBVIEW} component={BrowserScreenWithOnBlurOnMount} options={{ animation: "none" }} />
        </DAppsTab.Navigator>
    );
}
