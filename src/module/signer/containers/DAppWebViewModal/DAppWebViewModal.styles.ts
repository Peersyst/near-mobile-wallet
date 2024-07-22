import styled from "@peersyst/react-native-styled";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import WebView from "react-native-webview";

export const DAppWebViewModalRoot = styled(CardNavigatorModal)(() => ({
    height: "100%",
    body: {
        padding: 0,
        paddingBottom: 0,
    },
}));

export const DAppWebView = styled(WebView)(() => ({
    backgroundColor: "transparent",
}));
