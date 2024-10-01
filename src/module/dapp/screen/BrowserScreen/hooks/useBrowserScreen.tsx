import { useRoute, RouteProp } from "@react-navigation/native";
import { DAppsParamsList, DAppScreens } from "module/dapp/navigator/DAppsNavigator.types";
import { useCallback, useMemo, useRef, useState } from "react";
import WebView, { WebViewNavigation } from "react-native-webview";
import { cleanURL } from "../utils/cleanURL";
import useBrowserBackHandler from "./useBrowserBackHandler";
import useNavigation from "module/common/hook/useNavigation";

export function useBrowserScreen() {
    const webViewRef = useRef<WebView>(null);
    const [canGoBack, setCanGoBack] = useState(false);
    const [canGoForward, setCanGoForward] = useState(false);
    const [loading, setLoading] = useState(true);

    const { navigate } = useNavigation();
    const { params } = useRoute<RouteProp<DAppsParamsList, DAppScreens.WEBVIEW>>();
    const [url, setUrl] = useState(cleanURL(params.url));

    useBrowserBackHandler(canGoBack, webViewRef); // Hook to handle back button

    function handleOnGoBack() {
        if (canGoBack) {
            webViewRef.current?.goBack();
        } else {
            navigate(DAppScreens.HOME);
        }
    }

    function handleOnGoForward() {
        if (canGoForward) {
            webViewRef.current?.goForward();
        }
    }

    const handleOnNavigationStateChange = useCallback(
        function ({ canGoBack, canGoForward, url }: WebViewNavigation) {
            setCanGoBack(canGoBack);
            setCanGoForward(canGoForward);
            setUrl(cleanURL(url));
        },
        [setCanGoBack, setCanGoForward, setUrl],
    );

    const handleOnLoad = useCallback(() => {
        setLoading(false);
    }, [setLoading]);

    function handleOnSearch(search: string) {
        setUrl(cleanURL(search));
    }

    const source = useMemo(() => ({ uri: url }), [url]);

    return {
        webviewProps: {
            ref: webViewRef,
            onNavigationStateChange: handleOnNavigationStateChange,
            onLoad: handleOnLoad,
            source,
        },
        headerProps: {
            canGoBack,
            canGoForward,
            onGoBack: handleOnGoBack,
            onGoForward: handleOnGoForward,
            url,
            onSearch: handleOnSearch,
        },
        loading,
        url,
    };
}
