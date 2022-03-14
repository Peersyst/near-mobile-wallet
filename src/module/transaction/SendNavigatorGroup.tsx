import { TabPanel, Tabs } from "react-native-components";
import LogoPage from "module/common/component/layout/LogoPage/LogoPage";
import SendToAddressScreen from "module/transaction/screen/SendToAddressScreen";
import GlassNavigator from "module/common/component/navigation/GlassNavigator/GlassNavigator";
import { translate } from "locale";

export enum SendScreens {
    SEND_TO_ADDRESS,
}

const SendNavigatorGroup = () => {
    return (
        <LogoPage>
            <Tabs>
                <GlassNavigator navbar={{ back: true, title: translate("send") }}>
                    <TabPanel index={SendScreens.SEND_TO_ADDRESS}>
                        <SendToAddressScreen />
                    </TabPanel>
                </GlassNavigator>
            </Tabs>
        </LogoPage>
    );
};

export default SendNavigatorGroup;
