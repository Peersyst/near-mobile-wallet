import {
    Col,
    Form,
    IconButton,
    Paper,
    PressableText,
    QrScanner,
    Row,
    Typography,
    useSetTab,
    useToast,
} from "@peersyst/react-native-components";
import TextField from "module/common/component/input/TextField/TextField";
import { ScanIcon } from "module/common/icons/ScanIcon";
import { useTheme } from "@peersyst/react-native-styled";
import Button from "module/common/component/input/Button/Button";
import sendRecoilState from "module/transaction/state/SendState";
import { send } from "../../../../asset/image";
import { SendImage } from "module/transaction/screen/SendToAddressScreen/SendToAddressScreen.styles";
import { useState } from "react";
import { SendScreens } from "module/transaction/component/core/SendModal/SendModal";
import { useRecoilState } from "recoil";
import WalletSelector from "module/wallet/component/input/WalletSelector/WalletSelector";
import useUncommittedTransaction from "module/transaction/hook/useUncommittedTransaction";
import useSelectedNetwork from "module/settings/hook/useSelectedNetwork";
import { useTranslate } from "module/common/hook/useTranslate";

export interface SendForm {
    sender: number;
    receiver: string;
}

const SendToAddressScreen = () => {
    const translate = useTranslate();
    const [sendState, setSendState] = useRecoilState(sendRecoilState);
    const [receiverAddress, setReceiverAddress] = useState(sendState.receiverAddress || "");
    const [scanQr, setScanQr] = useState(false);
    const { palette } = useTheme();
    const { showToast, hideToast } = useToast();
    const setTab = useSetTab();
    const uncommittedTransaction = useUncommittedTransaction();
    const network = useSelectedNetwork();

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
        <>
            <Form onSubmit={handleSubmit}>
                <Col>
                    <Row justifyContent="center">
                        <SendImage source={send} />
                    </Row>
                    <Col gap={40}>
                        <Paper style={{ padding: 20 }} elevation={8}>
                            <Col gap={20}>
                                <WalletSelector
                                    label={translate("select_a_wallet") + ":"}
                                    required
                                    name="sender"
                                    defaultValue={sendState.senderWalletIndex}
                                />
                                <TextField
                                    label={translate("send_to") + ":"}
                                    placeholder={translate("address")}
                                    suffix={
                                        <IconButton style={{ color: palette.darkGray, fontSize: 24 }} onPress={() => setScanQr(true)}>
                                            <ScanIcon />
                                        </IconButton>
                                    }
                                    name="receiver"
                                    validators={{ address: network }}
                                    value={receiverAddress}
                                    onChange={setReceiverAddress}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                            </Col>
                        </Paper>
                        <Col gap={8}>
                            <Button
                                type="submit"
                                variant="outlined"
                                fullWidth
                                disabled={uncommittedTransaction}
                                loading={uncommittedTransaction}
                            >
                                {translate("next")}
                            </Button>
                            {uncommittedTransaction && (
                                <Typography variant="body2" textAlign="center">
                                    {translate("pending_transaction_text")}
                                </Typography>
                            )}
                        </Col>
                    </Col>
                </Col>
            </Form>
            {scanQr && <QrScanner open={scanQr} onClose={() => setScanQr(false)} onScan={({ data }) => handleAddressScan(data)} />}
        </>
    );
};

export default SendToAddressScreen;
