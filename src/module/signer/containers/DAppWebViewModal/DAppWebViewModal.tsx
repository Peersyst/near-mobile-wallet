import { DAppWebViewProps } from "./DAppWebViewModal.types";
import { SignerModalType } from "../../hooks/useSignerModal";
import useSignerModal from "../../hooks/useSignerModal";
import { ShouldStartLoadRequest } from "react-native-webview/lib/WebViewTypes";
import { DAppWebViewModalRoot, DAppWebView } from "./DAppWebViewModal.styles";
import { createModal } from "@peersyst/react-native-components";
import useSelectedWallet from "module/wallet/hook/useSelectedWallet";
import useSelectedNetwork from "module/settings/hook/useSelectedNetwork";

export const DAppWebViewModal = createModal(function DAppWebViewModal({ url, name, ...restProps }: DAppWebViewProps): JSX.Element {
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
    function handleWebViewRequestLoad({ url }: ShouldStartLoadRequest): boolean {
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
        <DAppWebViewModalRoot navbar={{ back: true, title: name }} {...restProps}>
            <DAppWebView
                source={{ uri: url }}
                originWhitelist={["*"]}
                onShouldStartLoadWithRequest={handleWebViewRequestLoad}
                injectedJavaScriptBeforeContentLoaded={injectedJavascript}
            />
        </DAppWebViewModalRoot>
    );
});
