import { useRoute, RouteProp } from "@react-navigation/native";
import { DAppsParamsList, DAppScreens } from "module/dapp/navigator/DAppsNavigator.types";
import { useCallback, useRef, useState } from "react";
import WebView, { WebViewNavigation } from "react-native-webview";
import { cleanURL } from "../utils/cleanURL";
import useBrowserBackHandler from "./useBrowserBackHandler";
import useNavigation from "module/common/hook/useNavigation";

export function useBrowserScreen() {
    const ref = useRef<WebView>(null);
    const [canGoBack, setCanGoBack] = useState(false);
    const [canGoForward, setCanGoForward] = useState(false);
    const [loading, setLoading] = useState(true);
    const { navigate } = useNavigation();
    const { params } = useRoute<RouteProp<DAppsParamsList, DAppScreens.WEBVIEW>>();
    const [url, setUrl] = useState(cleanURL(params.url));

    useBrowserBackHandler(canGoBack, ref); // Hook to handle back button

    function handleOnGoBack() {
        if (canGoBack) {
            ref.current?.goBack();
        } else {
            navigate(DAppScreens.HOME);
        }
    }

    function handleOnGoForward() {
        if (canGoForward) {
            ref.current?.goForward();
        }
    }

    const handleOnNavigationStateChange = useCallback(
        function ({ canGoBack, canGoForward, title }: WebViewNavigation) {
            setCanGoBack(canGoBack);
            setCanGoForward(canGoForward);
            console.log("Title: ", title);
        },
        [setCanGoBack, setCanGoForward],
    );

    const handleOnLoad = useCallback(() => {
        setLoading(false);
    }, [setLoading]);

    function handleOnSearch(search: string) {
        setUrl(cleanURL(search));
    }

    return {
        webviewProps: {
            ref,
            onNavigationStateChange: handleOnNavigationStateChange,
            onLoad: handleOnLoad,
            source: { uri: url },
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
