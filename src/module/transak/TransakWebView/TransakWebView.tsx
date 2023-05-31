import { WebView, WebViewNavigation } from "react-native-webview";
import { TransakWebViewProps } from "./TransakWebView.types";
import { memo, useMemo } from "react";
import parseQueryParams from "./utils/parseQueryParams";
import { Platform } from "react-native";

function TransakWebView({ queryParams, ...rest }: TransakWebViewProps): JSX.Element {
    const uri = useMemo(() => parseQueryParams(queryParams), [queryParams]);
    return (
        <WebView
            source={{ uri }}
            enableApplePay={Platform.OS === "ios"}
            allowInlineMediaPlayback
            mediaPlaybackRequiresUserAction={false}
            {...rest}
        />
    );
}

export default memo(TransakWebView);
