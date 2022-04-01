import { formatAddress } from "@peersyst/react-utils";
import { translate } from "locale";
import { SendState } from "module/transaction/state/SendState";
import Balance from "module/wallet/component/display/Balance/Balance";
import { BalanceProps } from "module/wallet/component/display/Balance/Balance.types";
import { Wallet } from "module/wallet/state/WalletState";
import { Paper, Col, Row, Typography } from "react-native-components";
import SummaryField from "./SummaryField";

type SendSummaryProps = Required<Pick<BalanceProps, "balance"> &
    Pick<SendState, "fee" | "receiverAddress" | "message"> & {
        senderName: string;
    }> & Pick<Wallet, "serviceInstance">;

const SendSummary = ({ balance, fee, receiverAddress, message, senderName, serviceInstance }: SendSummaryProps): JSX.Element => {
    return (
        <Paper style={{ padding: "7%" }}>
            <Col gap="4%" alignItems="center">
                <Col gap={5} alignItems="center">
                    <Balance balance={balance} units="CKB" variant="h1" boldUnits />
                    <Row>
                        <Typography variant="body1">{translate("transaction_fee_label")}: </Typography>
                        <Balance balance={fee!} units="CKB" variant="body1" fontWeight="bold" boldUnits />
                    </Row>
                </Col>
                <Col gap="3%" style={{ alignSelf: "flex-start" }}>
                    <SummaryField label={translate("from")}>
                        {senderName + " - " + formatAddress(serviceInstance?.getAddress() || "", "middle", 3)}
                    </SummaryField>
                    <SummaryField label={translate("to")}>{formatAddress(receiverAddress!, "middle", 3)}</SummaryField>
                    <SummaryField label={translate("message")}>{message || "-"}</SummaryField>
                </Col>
            </Col>
        </Paper>
    );
};

export default SendSummary;
