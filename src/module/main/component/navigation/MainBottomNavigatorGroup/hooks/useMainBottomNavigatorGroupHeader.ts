import { MainScreens } from "module/common/component/navigation/MainNavigatorGroup/MainScreens";
import { DAppScreens } from "module/dapp/navigator/DAppsNavigator.types";
import { useState } from "react";

export default function useMainBottomNavigatorGroupHeader() {
    const [showHeader, setShowHeader] = useState(true);

    function handleRouteChange(route: any) {
        if (route.name === MainScreens.DAPPS) {
            const routeIndex = route.state?.index;
            if ([DAppScreens.WEBVIEW].includes(route?.state?.routes?.[routeIndex]?.name)) {
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
