import { Col, Paper, Row, Typography } from "react-native-components";
import CountdownButton from "module/common/component/input/CountdownButton/CountdownButton";
import { translate } from "locale";
import Balance from "module/wallet/component/display/Balance/Balance";
import { useRecoilValue } from "recoil";
import sendState from "module/transaction/state/SendState";
import SummaryField from "module/transaction/screen/SendConfirmationScreen/SummaryField";
import useWallet from "module/wallet/hook/useWallet";

const SendConfirmationScreen = (): JSX.Element => {
    const { amount, fee, senderAddress, receiverAddress, message } = useRecoilValue(sendState);
    const {
        state: { cells },
    } = useWallet();
    const { name: senderName } = cells.find((cell) => cell.address === senderAddress)!;

    return (
        <Col gap={"10%"}>
            <Paper style={{ paddingTop: "10%", paddingHorizontal: "7%", paddingBottom: "7%" }}>
                <Col gap={20} alignItems="center">
                    <Col gap={5} alignItems="center">
                        <Balance balance={amount!} units="CKB" variant="h1" boldUnits />
                        <Row>
                            <Typography variant="body1">{translate("transaction_fee_label")}: </Typography>
                            <Balance balance={fee!} units="CKB" variant="body1" fontWeight="bold" boldUnits />
                        </Row>
                    </Col>
                    <Row>
                        <Typography variant="h2">{translate("total")}: </Typography>
                        <Balance balance={(Number(amount) + Number(fee)).toString()} units="CKB" variant="h2" fontWeight="bold" boldUnits />
                    </Row>
                    <Col gap={20}>
                        <SummaryField label={translate("from")}>{senderName + " - " + senderAddress}</SummaryField>
                        <SummaryField label={translate("to")}>{receiverAddress!}</SummaryField>
                        <SummaryField label={translate("message")}>{message || "-"}</SummaryField>
                    </Col>
                </Col>
            </Paper>
            <Typography variant="caption" textAlign="center">
                {translate("send_confirmation_text")}
            </Typography>
            <CountdownButton variant="outlined" seconds={10} fullWidth>
                {translate("confirm")}
            </CountdownButton>
        </Col>
    );
};

export default SendConfirmationScreen;
