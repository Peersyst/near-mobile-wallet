import { DAppsTab } from "stack-navigator";
import DAppsScreen from "../screen/DappsScreen/DAppsScreen";
import { DAppScreens } from "./DAppsNavigator.types";
import SearchScreen from "../screen/SearchScreen/SearchScreen";
import BrowserScreen from "../screen/BrowserScreen/BrowserScreen";

export default function DAppsNavigator(): JSX.Element {
    return (
        <DAppsTab.Navigator initialRouteName={DAppScreens.HOME} screenOptions={{ headerShown: false }}>
            <DAppsTab.Screen name={DAppScreens.HOME} component={DAppsScreen} />
            <DAppsTab.Screen name={DAppScreens.SEARCH} component={SearchScreen} />
            <DAppsTab.Screen name={DAppScreens.WEBVIEW} component={BrowserScreen} />
        </DAppsTab.Navigator>
    );
}
