import { Col } from "@peersyst/react-native-components";
import styled from "@peersyst/react-native-styled";
import DAppWebView from "module/signer/containers/DAppWebView/DAppWebView";

export const BrowserScreenRoot = styled(Col)(({ theme }) => ({
    flex: 1,
    backgroundColor: theme.palette.background,
}));

export const BrowserScreenWebView = styled(DAppWebView)(({ theme }) => ({
    backgroundColor: theme.palette.background,
}));

export const BrowserScreenLoadingContainer = styled(Col)(({ theme }) => ({
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.background,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
}));
