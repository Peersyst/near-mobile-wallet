import { BackdropProps, createBackdrop, TabPanel, Tabs } from "react-native-components";
import SendToAddressScreen from "module/transaction/screen/SendToAddressScreen/SendToAddressScreen";
import { translate } from "locale";
import { useState } from "react";
import GlassNavigatorModal from "module/common/component/navigation/GlassNavigatorModal/GlassNavigatorModal";

export enum SendScreens {
    SEND_TO_ADDRESS,
}

const SendModal = createBackdrop((props: BackdropProps) => {
    const [activeIndex, setActiveIndex] = useState(SendScreens.SEND_TO_ADDRESS);

    return (
        <GlassNavigatorModal breadcrumbs={{ length: 3, index: activeIndex }} navbar={{ back: true, title: translate("send") }} {...props}>
            <Tabs index={activeIndex} onIndexChange={setActiveIndex}>
                <TabPanel index={SendScreens.SEND_TO_ADDRESS}>
                    <SendToAddressScreen />
                </TabPanel>
            </Tabs>
        </GlassNavigatorModal>
    );
});

export default SendModal;
