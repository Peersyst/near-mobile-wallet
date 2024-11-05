import { ShouldStartLoadRequest } from "react-native-webview/lib/WebViewTypes";
import useSignerModal, { SignerModalType } from "module/signer/hooks/useSignerModal";
import { useCallback, useEffect, useState } from "react";
import { useConfig } from "@peersyst/react-native-components";

export default function useHandleDAppWebViewRequestLoad(): (request: ShouldStartLoadRequest) => boolean {
    const { showSignerModal } = useSignerModal();
    const [id, setId] = useState<string | null>(null);
    const [type, setType] = useState<SignerModalType | null>(null);
    const appUrlScheme = useConfig("appUrlScheme");
    const { backendUrl: signerBackendUrl } = useConfig("signerFeature");

    useEffect(() => {
        if (id && type) {
            showSignerModal(type, id);
            setId(null);
            setType(null);
        }
    }, [id, type]);

    /**
     * Handle a request load event from the WebView.
     * If the new url is a NEAR Mobile sign deeplink, show the signer modal.
     * Otherwise, allow the WebView to load the new url.
     * Important: we do not open the showSignerModal here because it will cause the WebView to load the DeepLink on Android.
     * We need to wait for the next render to show the modal.
     */
    const handleWebViewRequestLoad = useCallback(
        (request: ShouldStartLoadRequest) => {
            const url = request.url;
            let type: SignerModalType;
            let id: string;

            if (url && url.startsWith(`${appUrlScheme}://sign`)) {
                const urlParts = url.split("/");
                type = urlParts[urlParts.length - 2] as SignerModalType;
                id = urlParts[urlParts.length - 1];
            } else if (url && url.startsWith(signerBackendUrl)) {
                id = url.split("uuid=")[1];
                type = url.split("type=")[1].split("&")[0] as SignerModalType;
            } else {
                return true;
            }

            if (type && id) {
                setId(id);
                setType(type);
            }

            return false;
        },
        [showSignerModal, setId, setType],
    );

    return handleWebViewRequestLoad;
}
