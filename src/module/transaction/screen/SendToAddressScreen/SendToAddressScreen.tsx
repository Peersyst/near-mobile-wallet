import { Col, Form, IconButton, Paper, PressableText, QrScanner, Row, useModal, useSetTab, useToast } from "react-native-components";
import FormGroup from "module/common/component/input/FormGroup/FormGroup";
import { translate } from "locale";
import TextField from "module/common/component/input/TextField/TextField";
import { ScanIcon } from "module/common/icons/ScanIcon";
import { useTheme } from "@peersyst/react-native-styled";
import Button from "module/common/component/input/Button/Button";
import sendRecoilState from "module/transaction/state/SendState";
import { image } from "../../../../asset/image";
import { SendImage } from "module/transaction/screen/SendToAddressScreen/SendToAddressScreen.styles";
import { useState } from "react";
import { SendScreens } from "module/transaction/component/core/SendModal/SendModal";
import { useRecoilState } from "recoil";
import WalletSelector from "module/wallet/component/input/WalletSelector/WalletSelector";

export interface SendForm {
    sender: number;
    receiver: string;
}

const SendToAddressScreen = () => {
    const [sendState, setSendState] = useRecoilState(sendRecoilState);
    const [receiverAddress, setReceiverAddress] = useState(sendState.receiverAddress || "");
    const { palette } = useTheme();
    const { showModal } = useModal();
    const { showToast, hideToast } = useToast();
    const setTab = useSetTab();

    const handleAddressScan = (data: string) => {
        setReceiverAddress(data);
        showToast(translate("scanned_address", { address: data }), {
            type: "success",
            duration: 10000,
            action: (
                <PressableText variant="body1" fontWeight="bold" onPress={hideToast}>
                    Dismiss
                </PressableText>
            ),
        });
    };

    const handleSubmit = ({ sender, receiver }: SendForm) => {
        setSendState((oldState) => ({ ...oldState, senderWalletIndex: sender, receiverAddress: receiver }));
        setTab(SendScreens.AMOUNT_AND_MESSAGE);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Col>
                <Row justifyContent="center">
                    <SendImage source={image.send} />
                </Row>
                <Col gap={40}>
                    <Paper style={{ padding: 20 }} elevation={8}>
                        <Col gap={20}>
                            <FormGroup label={translate("select_a_wallet") + ":"}>
                                <WalletSelector required name="sender" defaultValue={sendState.senderWalletIndex} />
                            </FormGroup>
                            <FormGroup label={translate("send_to") + ":"}>
                                <TextField
                                    placeholder={translate("address")}
                                    suffix={
                                        <IconButton
                                            style={{ color: palette.darkGray, fontSize: 24 }}
                                            onPress={() => showModal(QrScanner, { onScan: ({ data }) => handleAddressScan(data) })}
                                        >
                                            <ScanIcon />
                                        </IconButton>
                                    }
                                    name="receiver"
                                    validators={{ address: true }}
                                    value={receiverAddress}
                                    onChange={setReceiverAddress}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                            </FormGroup>
                        </Col>
                    </Paper>
                    <Button variant="outlined" fullWidth>
                        {translate("next")}
                    </Button>
                </Col>
            </Col>
        </Form>
    );
};

export default SendToAddressScreen;
