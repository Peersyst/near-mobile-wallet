import { BrowserScreenLoadingContainer, BrowserScreenRoot, BrowserScreenWebView } from "./BrowserScreen.styles";
import { useBrowserScreen } from "./hooks/useBrowserScreen";
import BrowserScreenHeader from "./BrowserScreenHeader/BrowserScreenHeader";
import { useEffect, useState } from "react";
import { LoadingLogo } from "module/common/component/feedback/LoadingLogo/LoadingLogo";
import { Col } from "@peersyst/react-native-components";

const BrowserScreen = (): JSX.Element => {
    const { headerProps, webviewProps } = useBrowserScreen();
    // Workaround to ensure the screen infers the correct height without the header
    const [isLoaded, setIsLoaded] = useState(false);
    const [isWebViewLoaded, setIsWebViewLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 500);
    }, []);

    return (
        <BrowserScreenRoot>
            <BrowserScreenHeader {...headerProps} />
            <Col flex={1}>
                {isLoaded && <BrowserScreenWebView onLoadEnd={() => setIsWebViewLoaded(true)} {...webviewProps} />}
                {(!isLoaded || !isWebViewLoaded) && (
                    <BrowserScreenLoadingContainer>
                        <LoadingLogo />
                    </BrowserScreenLoadingContainer>
                )}
            </Col>
        </BrowserScreenRoot>
    );
};

export default BrowserScreen;
