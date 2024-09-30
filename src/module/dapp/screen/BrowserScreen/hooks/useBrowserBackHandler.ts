import { useEffect } from "react";
import { BackHandler } from "react-native";
import WebView from "react-native-webview";

export default function useBrowserBackHandler(canGoBack: boolean, webViewRef: React.RefObject<WebView>) {
    useEffect(() => {
        const onPress = () => {
            if (canGoBack) {
                webViewRef.current?.goBack();
                return true;
            } else {
                return false;
            }
        };

        BackHandler.addEventListener("hardwareBackPress", onPress);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", onPress);
        };
    }, [canGoBack]);
}
