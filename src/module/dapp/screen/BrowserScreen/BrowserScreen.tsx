import { Col } from "@peersyst/react-native-components";
import { RouteProp, useRoute } from "@react-navigation/native";
import { DAppScreens, DAppsParamsList } from "module/dapp/navigator/DAppsNavigator.types";
import WebView from "react-native-webview";

function cleanUrl(url: string): string {
    if (url.startsWith("http://")) {
        return url.replace("http://", "https://");
    } else if (url.startsWith("https://")) {
        return url;
    } else {
        return `https://www.google.com/search?q=${url}`;
    }
}

const BrowserScreen = (): JSX.Element => {
    const { params } = useRoute<RouteProp<DAppsParamsList, DAppScreens.WEBVIEW>>();

    return (
        <Col flex={1}>
            <WebView source={{ uri: cleanUrl(params.url) }} />
        </Col>
    );
};

export default BrowserScreen;
