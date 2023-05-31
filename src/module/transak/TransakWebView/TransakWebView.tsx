import { WebView, WebViewNavigation } from "react-native-webview";
import { TransakWebViewProps } from "./TransakWebView.types";
import { memo, useMemo } from "react";
import parseQueryParams from "./utils/parseQueryParams";
import { Platform } from "react-native";

function TransakWebView({ queryParams, onTransakEventHandler, ...rest }: TransakWebViewProps): JSX.Element {
    const uri = useMemo(() => parseQueryParams(queryParams), [queryParams]);
    //TODO: onTransakEventHandler
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
