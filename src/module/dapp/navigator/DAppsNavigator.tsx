import { DAppsTab } from "stack-navigator";
import DAppsScreen from "../screen/DappsScreen/DAppsScreen";
import { DAppScreens } from "./DAppsNavigator.types";
import BrowserScreen from "../screen/BrowserScreen/BrowserScreen";
import { withBasePageContent } from "module/common/component/layout/BasePage/BasePageContent/hoc/withBasePageContent";

export default function DAppsNavigator(): JSX.Element {
    return (
        <DAppsTab.Navigator initialRouteName={DAppScreens.HOME} screenOptions={{ headerShown: false }}>
            <DAppsTab.Screen name={DAppScreens.HOME} component={withBasePageContent(DAppsScreen)} />
            <DAppsTab.Screen name={DAppScreens.WEBVIEW} component={BrowserScreen} options={{ animation: "none" }} />
        </DAppsTab.Navigator>
    );
}
