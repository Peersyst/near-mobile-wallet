import { WebView } from "react-native-webview";
import { TransakWebViewProps } from "./TransakWebView.types";
import { memo } from "react";

function TransakWebView(props: TransakWebViewProps): JSX.Element {
    //TODO: Remove this hardcoded uri
    return (
        <WebView
            source={{
                uri: "https://global.transak.com/?apiKey=f2d9a722-cac0-4bea-bdfc-2560d65f1a1e&defaultCryptoCurrency=NEAR&networks=mainnet&cryptoCurrencyList=NEAR",
            }}
            {...props}
        />
    );
}

export default memo(TransakWebView);
