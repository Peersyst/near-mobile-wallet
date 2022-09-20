import { Col, Form, Paper, Row, Typography, useSetTab } from "@peersyst/react-native-components";
import { translate } from "locale";
import Button from "module/common/component/input/Button/Button";
import sendRecoilState from "module/transaction/state/SendState";
import { deposit } from "../../../../asset/image";
import { SendScreens } from "module/transaction/component/core/SendModal/SendModal";
import { useRecoilState } from "recoil";
import WalletSelector from "module/wallet/component/input/WalletSelector/WalletSelector";
import { DepositImage } from "./DepositImage.styles";
import useUncommittedTransaction from "module/transaction/hook/useUncommittedTransaction";
import useWalletState from "module/wallet/hook/useWalletState";

export interface DepositForm {
    sender: number;
}

const DepositSelectAccountScreen = () => {
    const {
        state: { selectedWallet: defaultSelectedWallet, wallets },
    } = useWalletState();
    const finalSelectedWallet =
        //Check if the user has a previous selectedWallet
        defaultSelectedWallet !== undefined
            ? //Check that the selected wallet is not the CreateWallet
              defaultSelectedWallet === wallets.length
                ? defaultSelectedWallet - 1
                : defaultSelectedWallet
            : 0;
    const [sendState, setSendState] = useRecoilState(sendRecoilState);
    const setTab = useSetTab();
    const handleSubmit = ({ sender }: DepositForm) => {
        setSendState((oldState) => ({ ...oldState, senderWalletIndex: sender }));
        setTab(SendScreens.AMOUNT_AND_MESSAGE);
    };
    const uncommittedTransaction = useUncommittedTransaction();

    return (
        <Form onSubmit={handleSubmit}>
            <Col>
                <Row justifyContent="center">
                    <DepositImage source={deposit} />
                </Row>
                <Col gap={40}>
                    <Paper style={{ padding: 20 }} elevation={8}>
                        <WalletSelector
                            label={translate("select_a_wallet") + ":"}
                            required
                            name="sender"
                            defaultValue={sendState.senderWalletIndex ?? finalSelectedWallet}
                        />
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
    );
};

export default DepositSelectAccountScreen;
