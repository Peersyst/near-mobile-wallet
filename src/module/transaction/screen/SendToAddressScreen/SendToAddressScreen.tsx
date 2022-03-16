import { Col, Form, IconButton, Paper, Row } from "react-native-components";
import AccountSelector from "module/wallet/component/input/AccountSelector/AccountSelector";
import FormGroup from "module/common/component/input/FormGroup/FormGroup";
import { translate } from "locale";
import TextField from "module/common/component/input/TextField/TextField";
import { ScanIcon } from "module/common/icons/ScanIcon";
import { useTheme } from "@peersyst/react-native-styled";
import { Alert } from "react-native";
import Button from "module/common/component/input/Button/Button";
import useWallet from "module/wallet/hook/useWallet";
import { useSetRecoilState } from "recoil";
import sendState from "module/transaction/state/SendState";
import { image } from "../../../../asset/image";
import { SendImage } from "module/transaction/screen/SendToAddressScreen/SendToAddressScreen.styles";

export interface SendForm {
    sender: number;
    receiver: string;
}

const SendToAddressScreen = () => {
    const { palette } = useTheme();
    const {
        state: { cells },
    } = useWallet();
    const setSendState = useSetRecoilState(sendState);

    const handleSubmit = ({ sender, receiver }: SendForm) => {
        setSendState((oldState) => ({ ...oldState, senderAddress: cells[sender].address, receiverAddress: receiver }));
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
                            <FormGroup label={translate("select_an_account") + ":"}>
                                <AccountSelector required name="sender" />
                            </FormGroup>
                            <FormGroup label={translate("send_to") + ":"}>
                                <TextField
                                    placeholder={translate("address")}
                                    suffix={
                                        <IconButton style={{ color: palette.darkGray, fontSize: 24 }} onPress={() => Alert.alert("Scan")}>
                                            <ScanIcon />
                                        </IconButton>
                                    }
                                    name="receiver"
                                    validators="not-null"
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
