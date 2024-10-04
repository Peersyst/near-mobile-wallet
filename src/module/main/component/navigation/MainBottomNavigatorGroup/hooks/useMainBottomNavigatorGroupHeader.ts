import { MainScreens } from "module/common/component/navigation/MainNavigatorGroup/MainScreens";
import { DAppScreens } from "module/dapp/navigator/DAppsNavigator.types";
import { useState } from "react";

export default function useMainBottomNavigatorGroupHeader() {
    const [showHeader, setShowHeader] = useState(true);

    // We need to use any here because the type of route is not defined
    function handleRouteChange(route: any) {
        if (route.name === MainScreens.DAPPS) {
            const routeIndex = route.state?.index;
            const routeName = route?.state?.routes?.[routeIndex]?.name;
            const paramsRouteName = route?.params?.screen;
            /**
             * 1 condition. If the route is WEBVIEW, hide the header
             * 2 contiion. If the route is WEBVIEW and comes from a nested route, hide the header
             */
            if (routeName === DAppScreens.WEBVIEW || (paramsRouteName === DAppScreens.WEBVIEW && !route?.state)) {
                setShowHeader(false);
            } else {
                setShowHeader(true);
            }
        } else {
            setShowHeader(true);
        }
    }

    return {
        header: showHeader,
        onRouteChange: handleRouteChange,
    };
}
