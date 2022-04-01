import { translate } from "locale";
import { SendState } from "module/transaction/state/SendState";
import Balance from "module/wallet/component/display/Balance/Balance";
import { BalanceProps } from "module/wallet/component/display/Balance/Balance.types";
import { ReactElement } from "react";
import { Paper, Col, Row, Typography } from "react-native-components";

type SendSummaryProps = Required<Pick<BalanceProps, "balance"> & Pick<SendState, "fee">> & {
    children: ReactElement;
};

const BaseSendSummary = ({ balance, fee, children }: SendSummaryProps): JSX.Element => {
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
                {children}
            </Col>
        </Paper>
    );
};

export default BaseSendSummary;
