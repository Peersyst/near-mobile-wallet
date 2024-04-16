import { createBackdrop, ExposedBackdropProps, TabPanel, Tabs } from "@peersyst/react-native-components";
import SendToAddressScreen from "module/transaction/screen/SendToAddressScreen/SendToAddressScreen";
import { useState } from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import sendState from "module/transaction/state/SendState";
import SendConfirmationScreen from "module/transaction/screen/SendConfirmationScreen/SendConfirmationScreen";
import SendSetAmountScreen from "module/transaction/screen/SendSetAmountScreen/SendSetAmountScreen";
import useTranslate from "module/common/hook/useTranslate";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import { SendScreens } from "module/transaction/screen/SendScreens.types";
import { Asset, AssetType } from "module/wallet/wallet.types";

export interface SendModalProps extends ExposedBackdropProps {
    defaultAsset?: Asset;
}

const SendModal = createBackdrop(({ onExited, defaultAsset, onClose, ...rest }: SendModalProps) => {
    const [activeIndex, setActiveIndex] = useState(SendScreens.AMOUNT_AND_MESSAGE);
    const setSendState = useSetRecoilState(sendState);
    const resetSendState = useResetRecoilState(sendState);
    const translate = useTranslate();

    const handleExited = () => {
        onExited?.();
        onClose?.();
        resetSendState();
    };

    const handleOnBack = () => {
        if (activeIndex === SendScreens.SEND_TO_ADDRESS) {
            setSendState((oldState) => ({ ...oldState, amount: undefined, asset: { type: AssetType.NATIVE_TOKEN } }));
        }
        setActiveIndex((oldIndex) => oldIndex - 1);
    };

    return (
        <CardNavigatorModal
            navbar={{
                back: true,
                title: translate("send").toUpperCase(),
                onBack: activeIndex > 0 ? handleOnBack : undefined,
                steps: {
                    length: 3,
                    index: activeIndex,
                },
            }}
            onExited={handleExited}
            onClose={handleExited}
            {...rest}
        >
            <Tabs index={activeIndex} onIndexChange={setActiveIndex}>
                <TabPanel index={SendScreens.AMOUNT_AND_MESSAGE}>
                    <SendSetAmountScreen defaultAsset={defaultAsset} />
                </TabPanel>
                <TabPanel index={SendScreens.SEND_TO_ADDRESS}>
                    <SendToAddressScreen />
                </TabPanel>
                <TabPanel index={SendScreens.CONFIRMATION}>
                    <SendConfirmationScreen onClose={() => onClose?.()} />
                </TabPanel>
            </Tabs>
        </CardNavigatorModal>
    );
});

export default SendModal;
