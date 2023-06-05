import { WebView } from "react-native-webview";
import { TransakWebViewProps } from "./TransakWebView.types";
import { memo, useMemo } from "react";
import parseQueryParams from "./utils/parseQueryParams";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function TransakWebView({ queryParams, ...rest }: TransakWebViewProps): JSX.Element {
    const uri = useMemo(() => parseQueryParams(queryParams), [queryParams]);

    const safeAreInstets = useSafeAreaInsets();

    return (
        <WebView
            source={{ uri }}
            enableApplePay
            allowsInlineMediaPlayback
            mediaPlaybackRequiresUserAction={false}
            // Beautify webview with safe area and background color
            containerStyle={{
                paddingBottom: safeAreInstets.bottom,
                backgroundColor: "rgb(244, 244, 244)",
            }}
            style={{ backgroundColor: "rgb(244, 244, 244)" }}
            {...rest}
        />
    );
}

export default memo(TransakWebView);
