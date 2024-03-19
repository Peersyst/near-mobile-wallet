import { Col, Form, useSetTab } from "@peersyst/react-native-components";
import Button from "module/common/component/input/Button/Button";
import sendRecoilState from "module/transaction/state/SendState";
import { useState } from "react";
import { useRecoilState } from "recoil";
import useTranslate from "module/common/hook/useTranslate";
import useWalletState from "module/wallet/hook/useWalletState";
import AddressTextFieldWithQRScanner from "module/transaction/component/input/AddressTextFieldWithQRScanner/AddressTextFieldWithQRScanner";
import { SendScreens } from "../SendScreens.types";

export interface SendForm {
    sender: number;
    receiver: string;
}

const SendToAddressScreen = () => {
    const translate = useTranslate();
    const setTab = useSetTab();

    const {
        state: { selectedWallet },
    } = useWalletState();
    const [sendState, setSendState] = useRecoilState(sendRecoilState);
    const defaultSenderWalletIndex = sendState.senderWalletIndex !== undefined ? sendState.senderWalletIndex : selectedWallet;
    const [currentSenderWalletIndex] = useState(defaultSenderWalletIndex);

    const handleSubmit = ({ receiver }: SendForm) => {
        setSendState((oldState) => ({ ...oldState, senderWalletIndex: currentSenderWalletIndex, receiverAddress: receiver }));
        setTab(SendScreens.CONFIRMATION);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Col gap={24}>
                <AddressTextFieldWithQRScanner
                    defaultValue={sendState.receiverAddress}
                    senderWalletIndex={currentSenderWalletIndex}
                    name="receiver"
                    required
                />
                <Col gap={8}>
                    <Button type="submit" fullWidth>
                        {translate("next")}
                    </Button>
                </Col>
            </Col>
        </Form>
    );
};

export default SendToAddressScreen;
