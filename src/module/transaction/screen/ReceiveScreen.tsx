import { translate } from "locale";
import LogoPage from "module/common/component/layout/LogoPage/LogoPage";
import GlassNavigator from "module/common/component/navigation/GlassNavigator/GlassNavigator";
import useRoute from "module/common/hook/useRoute";
import { Dimensions, ScrollView } from "react-native";
import { Col } from "react-native-components";
import ReceiveCard from "../component/core/ReceiveCard/ReceiveCard";
import QRCode from "../component/display/QRCode/QRCode";

const ReceiveScreen = (): JSX.Element => {
    
    const height = Dimensions.get("window").height;
    return (
        <LogoPage>
            <GlassNavigator navbar={{ back: true, title: translate("receive") }}>
                <ScrollView style={{ maxHeight: height * 0.8}}>
                    <Col gap={30}>
                        <QRCode />
                        <ReceiveCard />
                    </Col>
                </ScrollView>
            </GlassNavigator>
        </LogoPage>
    );
};

export default ReceiveScreen;
