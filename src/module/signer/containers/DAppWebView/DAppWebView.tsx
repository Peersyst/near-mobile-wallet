import useSelectedWallet from "module/wallet/hook/useSelectedWallet";
import useSelectedNetwork from "module/settings/hook/useSelectedNetwork";
import WebView, { WebViewProps } from "react-native-webview";
import { forwardRef } from "react";
import useHandleDAppWebViewRequestLoad from "./hooks/useHandleDAppWebViewRequestLoad";

export type DAppWebViewProps = Omit<
    WebViewProps,
    | "injectedJavascript"
    | "onShouldStartLoadWithRequest"
    | "originWhitelist"
    | "onStartShouldSetResponder"
    | "injectedJavaScriptBeforeContentLoaded"
>;

const DAppWebView = forwardRef<WebView, DAppWebViewProps>(({ style, ...rest }, ref): JSX.Element => {
    const { account } = useSelectedWallet();
    const network = useSelectedNetwork();
    const handleWebViewRequestLoad = useHandleDAppWebViewRequestLoad();

    const injectedJavascript = `window.isNearMobile = true;
    const nearMobileSession = JSON.parse(localStorage.getItem("near-mobile-signer:session"));
    if (!!nearMobileSession && !!nearMobileSession.${network} && nearMobileSession.${network}.activeAccount !== "${account}") {
        localStorage.removeItem("near-mobile-signer:session");
    }`;

    return (
        <WebView
            ref={ref}
            originWhitelist={["*"]}
            setSupportMultipleWindows={false} // Prevents the WebView from opening native browser on Android
            onShouldStartLoadWithRequest={handleWebViewRequestLoad}
            injectedJavaScriptBeforeContentLoaded={injectedJavascript}
            allowsInlineMediaPlayback={true} // Allows video playback in the WebView. Prevents fullscreen video playback on iOS.
            onStartShouldSetResponder={() => true}
            style={[{ backgroundColor: "transparent", flex: 1 }, style]}
            {...rest}
        />
    );
});

DAppWebView.displayName = "DAppWebView";

export default DAppWebView;
