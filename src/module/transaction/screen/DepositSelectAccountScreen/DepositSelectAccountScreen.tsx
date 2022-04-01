import { Col, Form, Paper, Row, useSetTab } from "react-native-components";
import FormGroup from "module/common/component/input/FormGroup/FormGroup";
import { translate } from "locale";
import Button from "module/common/component/input/Button/Button";
import sendRecoilState from "module/transaction/state/SendState";
import { image } from "../../../../asset/image";
import { SendScreens } from "module/transaction/component/core/SendModal/SendModal";
import { useRecoilState } from "recoil";
import WalletSelector from "module/wallet/component/input/WalletSelector/WalletSelector";
import { DepositImage } from "./DepositImage.styles";

export interface DepositForm {
    sender: number;
}

const DepositSelectAccountScreen = () => {
    const [sendState, setSendState] = useRecoilState(sendRecoilState);
    const setTab = useSetTab();
    const handleSubmit = ({ sender }: DepositForm) => {
        setSendState((oldState) => ({ ...oldState, senderWalletIndex: sender, receiverAddress: "0x0" }));
        setTab(SendScreens.AMOUNT_AND_MESSAGE);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Col>
                <Row justifyContent="center">
                    <DepositImage source={image.deposit} />
                </Row>
                <Col gap={40}>
                    <Paper style={{ padding: 20 }} elevation={8}>
                        <FormGroup label={translate("select_a_wallet") + ":"}>
                            <WalletSelector required name="sender" defaultValue={sendState.senderWalletIndex} />
                        </FormGroup>
                    </Paper>
                    <Button variant="outlined" fullWidth>
                        {translate("next")}
                    </Button>
                </Col>
            </Col>
        </Form>
    );
};

export default DepositSelectAccountScreen;
