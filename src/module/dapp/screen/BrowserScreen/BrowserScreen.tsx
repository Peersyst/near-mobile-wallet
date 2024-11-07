import { BrowserScreenLoadingContainer, BrowserScreenRoot, BrowserScreenWebView } from "./BrowserScreen.styles";
import { useBrowserScreen } from "./hooks/useBrowserScreen";
import BrowserScreenHeader from "./BrowserScreenHeader/BrowserScreenHeader";
import { useState } from "react";
import { LoadingLogo } from "module/common/component/feedback/LoadingLogo/LoadingLogo";
import { Col } from "@peersyst/react-native-components";

const BrowserScreen = (): JSX.Element => {
    const { headerProps, webviewProps } = useBrowserScreen();
    const [isWebViewLoaded, setIsWebViewLoaded] = useState(false);

    return (
        <BrowserScreenRoot>
            <BrowserScreenHeader {...headerProps} />
            <Col flex={1}>
                {isWebViewLoaded && <BrowserScreenWebView onLoadEnd={() => setIsWebViewLoaded(true)} {...webviewProps} />}
                {!isWebViewLoaded && (
                    <BrowserScreenLoadingContainer>
                        <LoadingLogo />
                    </BrowserScreenLoadingContainer>
                )}
            </Col>
        </BrowserScreenRoot>
    );
};

export default BrowserScreen;
