import { WebView } from "react-native-webview";
import { TransakWebViewProps } from "./TransakWebView.types";
import { memo, useMemo } from "react";
import parseQueryParams from "./utils/parseQueryParams";

function TransakWebView({ queryParams, ...rest }: TransakWebViewProps): JSX.Element {
    const uri = useMemo(() => parseQueryParams(queryParams), [queryParams]);
    return <WebView source={{ uri }} enableApplePay allowsInlineMediaPlayback mediaPlaybackRequiresUserAction={false} {...rest} />;
}

export default memo(TransakWebView);
