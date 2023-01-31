import { Col, Form, IconButton, PressableText, useSetTab, useToast } from "@peersyst/react-native-components";
import TextField from "module/common/component/input/TextField/TextField";
import { useTheme } from "@peersyst/react-native-styled";
import Button from "module/common/component/input/Button/Button";
import sendRecoilState from "module/transaction/state/SendState";
import { useState } from "react";
import { SendScreens } from "module/transaction/component/core/SendModal/SendModal";
import { useRecoilState, useRecoilValue } from "recoil";
import WalletSelector from "module/wallet/component/input/WalletSelector/WalletSelector";
import { useTranslate } from "module/common/hook/useTranslate";
import { CameraIcon } from "icons";
import QrScanner from "module/common/component/input/QrScanner/QrScanner";
import settingsState from "module/settings/state/SettingsState";
import { config } from "config";
import useSelectedWallet from "module/wallet/hook/useSelectedWallet";
import useWalletState from "module/wallet/hook/useWalletState";

export interface SendForm {
    sender: number;
    receiver: string;
}

const SendToAddressScreen = () => {
    const translate = useTranslate();
    const translateError = useTranslate("error");
    const { palette } = useTheme();
    const { showToast, hideToast } = useToast();
    const setTab = useSetTab();

    const {
        state: { wallets, selectedWallet },
    } = useWalletState();
    const [sendState, setSendState] = useRecoilState(sendRecoilState);
    const defaultSenderWalletIndex = sendState.senderWalletIndex !== undefined ? sendState.senderWalletIndex : selectedWallet;
    const [currentSenderWalletIndex, setCurrentSenderWalletIndex] = useState(defaultSenderWalletIndex);
    const { account } = wallets[currentSenderWalletIndex];
    const { network } = useRecoilValue(settingsState);
    const [receiverAddress, setReceiverAddress] = useState(sendState.receiverAddress || "");
    const [scanQr, setScanQr] = useState(false);

    const handleAddressScan = (data: string) => {
        setReceiverAddress(data);
        showToast(translate("scanned_address", { address: data }), {
            type: "success",
            duration: 10000,
            action: (
                <PressableText variant="body3Strong" onPress={hideToast}>
                    {translate("dismiss")}
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
                <Col gap={24}>
                    <WalletSelector
                        value={currentSenderWalletIndex}
                        onChange={setCurrentSenderWalletIndex}
                        label={translate("select_a_wallet")}
                        required
                        name="sender"
                        minBalance={config.estimatedFee}
                    />
                    <TextField
                        label={translate("send_to")}
                        placeholder={translate("address")}
                        suffix={
                            <IconButton style={{ color: palette.primary, fontSize: 24 }} onPress={() => setScanQr(true)}>
                                <CameraIcon />
                            </IconButton>
                        }
                        name="receiver"
                        validators={{ address: network, notEq: [account, translateError("invalid_send_same_account")] }}
                        value={receiverAddress}
                        onChange={setReceiverAddress}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <Col gap={8}>
                        <Button type="submit" fullWidth>
                            {translate("next")}
                        </Button>
                    </Col>
                </Col>
            </Form>
            {scanQr && <QrScanner open={scanQr} onClose={() => setScanQr(false)} onScan={({ data }) => handleAddressScan(data)} />}
        </>
    );
};

export default SendToAddressScreen;
