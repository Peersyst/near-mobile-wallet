import { SendState } from "module/transaction/state/SendState";
import Balance from "module/wallet/component/display/Balance/Balance";
import { BalanceProps } from "module/wallet/component/display/Balance/Balance.types";
import { ReactElement } from "react";
import { Paper, Col, Row, Typography } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";

export interface BaseSendSummaryFullProps extends Required<Pick<SendState, "fee">> {
    amount: BalanceProps["balance"];
    children: ReactElement;
}

export type BaseSendSummaryProps = Omit<BaseSendSummaryFullProps, "children">;

const BaseSendSummary = ({ amount, fee, children }: BaseSendSummaryFullProps): JSX.Element => {
    const translate = useTranslate();
    return (
        <Paper style={{ padding: "7%" }}>
            <Col gap="3%" alignItems="center">
                <Col gap={5} alignItems="center">
                    <Balance balance={amount} variant="h1" />
                    <Row>
                        <Typography variant="body1">{translate("transaction_fee_label")}: </Typography>
                        <Balance balance={fee} variant="body1" fontWeight="bold" />
                    </Row>
                </Col>
                {children}
            </Col>
        </Paper>
    );
};

export default BaseSendSummary;
