import { BrowserScreenRoot } from "./BrowserScreen.styles";
import { useBrowserScreen } from "./hooks/useBrowserScreen";
import BrowserScreenHeader from "./BrowserScreenHeader/BrowserScreenHeader";
import DAppWebView from "module/signer/containers/DAppWebView/DAppWebView";

const BrowserScreen = (): JSX.Element => {
    const { headerProps, webviewProps } = useBrowserScreen();

    return (
        <BrowserScreenRoot>
            <BrowserScreenHeader {...headerProps} />
            <DAppWebView {...webviewProps} />
        </BrowserScreenRoot>
    );
};

export default BrowserScreen;
