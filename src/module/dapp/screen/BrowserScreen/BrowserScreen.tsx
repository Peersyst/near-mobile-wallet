import WebView from "react-native-webview";
import { BrowserScreenRoot } from "./BrowserScreen.styles";
import { useBrowserScreen } from "./hooks/useBrowserScreen";
import BrowserScreenHeader from "./BrowserScreenHeader/BrowserScreenHeader";

const BrowserScreen = (): JSX.Element => {
    const { headerProps, webviewProps } = useBrowserScreen();

    return (
        <BrowserScreenRoot>
            <BrowserScreenHeader {...headerProps} />
            <WebView {...webviewProps} />
        </BrowserScreenRoot>
    );
};

export default BrowserScreen;
