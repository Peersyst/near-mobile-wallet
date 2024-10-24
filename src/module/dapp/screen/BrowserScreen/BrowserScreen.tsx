import { BrowserScreenRoot } from "./BrowserScreen.styles";
import { useBrowserScreen } from "./hooks/useBrowserScreen";
import BrowserScreenHeader from "./BrowserScreenHeader/BrowserScreenHeader";
import DAppWebView from "module/signer/containers/DAppWebView/DAppWebView";
import { useEffect, useState } from "react";

const BrowserScreen = (): JSX.Element => {
    const { headerProps, webviewProps } = useBrowserScreen();

    // Workaround to ensure the screen infers the correct height without the header
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 500);
    }, []);

    return (
        <BrowserScreenRoot>
            {isLoaded ? (
                <>
                    <BrowserScreenHeader {...headerProps} />
                    <DAppWebView {...webviewProps} />
                </>
            ) : (
                <></>
            )}
        </BrowserScreenRoot>
    );
};

export default BrowserScreen;
