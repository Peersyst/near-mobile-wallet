import { TabPanel, Tabs } from "react-native-components";
import LogoPage from "module/common/component/layout/LogoPage/LogoPage";
import SendToAddressScreen from "module/transaction/screen/SendToAddressScreen";
import GlassNavigator from "module/common/component/navigation/GlassNavigator/GlassNavigator";
import { translate } from "locale";
import { useState } from "react";

export enum SendScreens {
    SEND_TO_ADDRESS,
}

const SendNavigatorGroup = () => {
    const [activeIndex, setActiveIndex] = useState(SendScreens.SEND_TO_ADDRESS);

    return (
        <LogoPage>
            <Tabs index={activeIndex} onIndexChange={setActiveIndex}>
                <GlassNavigator navbar={{ back: true, title: translate("send") }} breadcrumbs={{ length: 3, index: activeIndex }}>
                    <TabPanel index={SendScreens.SEND_TO_ADDRESS}>
                        <SendToAddressScreen />
                    </TabPanel>
                </GlassNavigator>
            </Tabs>
        </LogoPage>
    );
};

export default SendNavigatorGroup;
