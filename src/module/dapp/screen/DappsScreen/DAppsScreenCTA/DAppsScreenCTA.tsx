import Typography from "module/common/component/display/Typography/Typography";
import { ImageBackground, TouchableWithoutFeedback } from "react-native";
import { dapps } from "images";
import { Row } from "@peersyst/react-native-components";
import useNavigation from "module/common/hook/useNavigation";
import { DAppScreens } from "module/dapp/navigator/DAppsNavigator.types";
import {
    DAppsScreenCTAContent,
    DAppsScreenCTAImageBackground,
    DAppsScreenCTAImageBackgroundOverlay,
    DAppsScreenCTARoot,
} from "./DAppsScreenCTA.styles";

const DAppsScreenCTA = (): JSX.Element => {
    const { navigate } = useNavigation();
    return (
        <TouchableWithoutFeedback onPress={() => navigate(DAppScreens.WEBVIEW, { url: "https://peersyst.com" })}>
            <DAppsScreenCTARoot>
                <DAppsScreenCTAContent>
                    <Typography variant="body3Strong" style={{ flex: 0.4 }}>
                        Take a look at our dApp selection
                    </Typography>
                </DAppsScreenCTAContent>
                <DAppsScreenCTAImageBackground imageStyle={{ borderRadius: 20, zIndex: -2 }} resizeMode="cover" source={dapps}>
                    <DAppsScreenCTAImageBackgroundOverlay />
                </DAppsScreenCTAImageBackground>
            </DAppsScreenCTARoot>
        </TouchableWithoutFeedback>
    );
};

export default DAppsScreenCTA;
