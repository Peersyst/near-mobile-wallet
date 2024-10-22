import { ShouldStartLoadRequest } from "react-native-webview/lib/WebViewTypes";
import useSelectedWallet from "module/wallet/hook/useSelectedWallet";
import useSelectedNetwork from "module/settings/hook/useSelectedNetwork";
import WebView, { WebViewProps } from "react-native-webview";
import useSignerModal, { SignerModalType } from "module/signer/hooks/useSignerModal";
import { forwardRef } from "react";

export type DAppWebViewProps = Omit<
    WebViewProps,
    | "injectedJavascript"
    | "onShouldStartLoadWithRequest"
    | "originWhitelist"
    | "onStartShouldSetResponder"
    | "injectedJavaScriptBeforeContentLoaded"
>;

const DAppWebView = forwardRef<WebView, DAppWebViewProps>(({ style, ...rest }, ref): JSX.Element => {
    const { showSignerModal } = useSignerModal();
    const { account } = useSelectedWallet();
    const network = useSelectedNetwork();

    const injectedJavascript = `window.isNearMobile = true;
    const nearMobileSession = JSON.parse(localStorage.getItem("near-mobile-signer:session"));
    if (!!nearMobileSession && !!nearMobileSession.${network} && nearMobileSession.${network}.activeAccount !== "${account}") {
        localStorage.removeItem("near-mobile-signer:session");
    }`;

    /**
     * Handle a request load event from the WebView.
     * If the new url is a NEAR Mobile sign deeplink, show the signer modal.
     */
    function handleWebViewRequestLoad(request: ShouldStartLoadRequest): boolean {
        const url = request.url;

        if (url && url.startsWith("near-mobile-wallet://sign")) {
            const urlParts = url.split("/");
            const type = urlParts[urlParts.length - 2];
            const id = urlParts[urlParts.length - 1];
            showSignerModal(type as SignerModalType, id);
            return false;
        } else {
            return true;
        }
    }

    return (
        <WebView
            ref={ref}
            originWhitelist={["*"]}
            setSupportMultipleWindows={false} // Prevents the WebView from opening native browser on Android
            onShouldStartLoadWithRequest={handleWebViewRequestLoad}
            injectedJavaScriptBeforeContentLoaded={injectedJavascript}
            onStartShouldSetResponder={() => true}
            style={[{ backgroundColor: "transparent", flex: 1 }, style]}
            {...rest}
        />
    );
});

DAppWebView.displayName = "DAppWebView";

export default DAppWebView;
