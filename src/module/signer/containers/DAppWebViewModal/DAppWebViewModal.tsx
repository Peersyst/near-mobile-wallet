import { DAppWebViewProps } from "./DAppWebViewModal.types";
import { useControlled } from "@peersyst/react-hooks";
import { SignerModalType } from "../../hooks/useSignerModal";
import useSignerModal from "../../hooks/useSignerModal";
import { ShouldStartLoadRequest } from "react-native-webview/lib/WebViewTypes";
import { DAppWebViewModalRoot, DAppWebView } from "./DAppWebViewModal.styles";

export function DAppWebViewModal({ url, name, open: openProp = false, onClose }: DAppWebViewProps): JSX.Element {
    const [open, setOpen] = useControlled(false, openProp, openProp ? onClose : undefined);
    const { showSignerModal } = useSignerModal();

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
        <DAppWebViewModalRoot open={open} onClose={() => setOpen(false)} navbar={{ back: true, title: name }}>
            <DAppWebView
                source={{ uri: url }}
                originWhitelist={["*"]}
                onShouldStartLoadWithRequest={handleWebViewRequestLoad}
                injectedJavaScript="window.isNearMobile = true;"
            />
        </DAppWebViewModalRoot>
    );
}
