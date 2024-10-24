import { DAppsTab } from "stack-navigator";
import DAppsScreen from "../screen/DappsScreen/DAppsScreen";
import { DAppScreens } from "./DAppsNavigator.types";
import BrowserScreen from "../screen/BrowserScreen/BrowserScreen";

export default function DAppsNavigator(): JSX.Element {
    return (
        <DAppsTab.Navigator initialRouteName={DAppScreens.HOME} screenOptions={{ headerShown: false }}>
            <DAppsTab.Screen name={DAppScreens.HOME} component={DAppsScreen} />
            <DAppsTab.Screen name={DAppScreens.WEBVIEW} component={BrowserScreen} options={{ animation: "none" }} />
        </DAppsTab.Navigator>
    );
}
