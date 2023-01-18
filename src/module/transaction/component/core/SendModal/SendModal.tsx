import { createBackdrop, ExposedBackdropProps, TabPanel, Tabs } from "@peersyst/react-native-components";
import SendToAddressScreen from "module/transaction/screen/SendToAddressScreen/SendToAddressScreen";
import { useState } from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import sendState from "module/transaction/state/SendState";
import SendConfirmationScreen from "module/transaction/screen/SendConfirmationScreen/SendConfirmationScreen";
import SendSetAmountScreen from "module/transaction/screen/SendSetAmountScreen/SendSetAmountScreen";
import { useTranslate } from "module/common/hook/useTranslate";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import { AssetType } from "module/wallet/wallet.types";

export enum SendScreens {
    SEND_TO_ADDRESS,
    AMOUNT_AND_MESSAGE,
    CONFIRMATION,
}

const SendModal = createBackdrop(({ onExited, ...rest }: ExposedBackdropProps) => {
    const [activeIndex, setActiveIndex] = useState(SendScreens.SEND_TO_ADDRESS);
    const setSendState = useSetRecoilState(sendState);
    const resetSendState = useResetRecoilState(sendState);
    const translate = useTranslate();

    const handleExited = () => {
        onExited?.();
        resetSendState();
    };

    const handleOnBack = () => {
        if (activeIndex === SendScreens.AMOUNT_AND_MESSAGE) {
            setSendState((oldState) => ({ ...oldState, amount: undefined, asset: { type: AssetType.TOKEN } }));
        }
        setActiveIndex((oldIndex) => oldIndex - 1);
    };

    return (
        <CardNavigatorModal
            navbar={{
                back: true,
                title: translate("send"),
                onBack: activeIndex > 0 ? handleOnBack : undefined,
                steps: {
                    length: 3,
                    index: activeIndex,
                },
            }}
            onExited={handleExited}
            {...rest}
        >
            <Tabs index={activeIndex} onIndexChange={setActiveIndex}>
                <TabPanel index={SendScreens.SEND_TO_ADDRESS}>
                    <SendToAddressScreen />
                </TabPanel>
                <TabPanel index={SendScreens.AMOUNT_AND_MESSAGE}>
                    <SendSetAmountScreen />
                </TabPanel>
                <TabPanel index={SendScreens.CONFIRMATION}>
                    <SendConfirmationScreen />
                </TabPanel>
            </Tabs>
        </CardNavigatorModal>
    );
});

export default SendModal;
