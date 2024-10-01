import { useRoute, RouteProp } from "@react-navigation/native";
import { DAppsParamsList, DAppScreens } from "module/dapp/navigator/DAppsNavigator.types";
import { useCallback, useMemo, useRef, useState } from "react";
import WebView, { WebViewNavigation } from "react-native-webview";
import { cleanURL } from "../utils/cleanURL";
import useBrowserBackHandler from "./useBrowserBackHandler";

export function useBrowserScreenWebview() {
    const webViewRef = useRef<WebView>(null);
    const [canGoBack, setCanGoBack] = useState(false);
    const [canGoForward, setCanGoForward] = useState(false);
    const { params } = useRoute<RouteProp<DAppsParamsList, DAppScreens.WEBVIEW>>();
    const [url, setUrl] = useState(cleanURL(params.url));

    const source = useMemo(() => ({ uri: url }), [url]);
    useBrowserBackHandler(canGoBack, webViewRef); // Hook to handle back button

    const handleOnNavigationStateChange = useCallback(
        function ({ canGoBack, canGoForward, url }: WebViewNavigation) {
            if (!url.startsWith("near-mobile-wallet://sign")) {
                setCanGoBack(canGoBack);
                setCanGoForward(canGoForward);
                setUrl(cleanURL(url));
            }
        },
        [setCanGoBack, setCanGoForward, setUrl],
    );

    function navigateBack() {
        if (canGoBack) {
            webViewRef.current?.goBack();
        }
    }

    function navigateForward() {
        if (canGoForward) {
            webViewRef.current?.goForward();
        }
    }

    return {
        webviewProps: {
            ref: webViewRef,
            onNavigationStateChange: handleOnNavigationStateChange,
            source,
        },
        url,
        setUrl,
        canGoBack,
        canGoForward,
        navigateBack,
        navigateForward,
    };
}
