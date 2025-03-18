import { BrowserScreenLoadingContainer, BrowserScreenRoot, BrowserScreenWebView } from "./BrowserScreen.styles";
import { useBrowserScreen } from "./hooks/useBrowserScreen";
import BrowserScreenHeader from "./BrowserScreenHeader/BrowserScreenHeader";
import { useEffect, useState } from "react";
import { LoadingLogo } from "module/common/component/feedback/LoadingLogo/LoadingLogo";
import { Col } from "@peersyst/react-native-components";
import { Platform } from "react-native";
import Typography from "module/common/component/display/Typography/Typography";
import useTranslate from "module/common/hook/useTranslate";

const BrowserScreen = (): JSX.Element => {
    const { headerProps, webviewProps } = useBrowserScreen();
    // Workaround to ensure the screen infers the correct height without the header
    const [isLoaded, setIsLoaded] = useState(false);
    const [isWebViewLoaded, setIsWebViewLoaded] = useState(false);
    const translate = useTranslate();

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
                        <Col alignItems="center" gap={30} justifyContent="center">
                            <LoadingLogo />
                            {Platform.OS === "android" && (
                                <Col gap={4} alignItems="center">
                                    <Typography variant="body1Strong" color="primary">
                                        {translate("loading") + "..."}
                                    </Typography>
                                    <Typography variant="body3Regular" color="primary">
                                        {translate("pleaseWaitAMoment")}
                                    </Typography>
                                </Col>
                            )}
                        </Col>
                    </BrowserScreenLoadingContainer>
                )}
            </Col>
        </BrowserScreenRoot>
    );
};

export default BrowserScreen;
