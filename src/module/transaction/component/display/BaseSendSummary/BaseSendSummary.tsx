import { SendState } from "module/transaction/state/SendState";
import Balance from "module/wallet/component/display/Balance/Balance";
import { BalanceProps } from "module/wallet/component/display/Balance/Balance.types";
import { ReactElement } from "react";
import { Col, Row } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import Typography from "module/common/component/display/Typography/Typography";
import Container from "module/common/component/display/Container/Container";

export interface BaseSendSummaryFullProps extends Required<Pick<SendState, "fee" | "token">> {
    amount: BalanceProps["balance"];
    children: ReactElement;
}

export type BaseSendSummaryProps = Omit<BaseSendSummaryFullProps, "children">;

const BaseSendSummary = ({ amount, fee, token, children }: BaseSendSummaryFullProps): JSX.Element => {
    const translate = useTranslate();
    return (
        <Container>
            <Col gap={16} alignItems="center">
                <Col gap={2} alignItems="center">
                    <Balance balance={amount} variant="h4Strong" units={token} />
                    <Row>
                        <Typography variant="body2Regular" light>
                            {translate("transaction_fee_label")}:{" "}
                        </Typography>
                        <Balance balance={fee} variant="body2Strong" units={token} light options={{ maximumFractionDigits: 6 }} />
                    </Row>
                    <Row>
                        <Typography variant="body2Regular" color={(palette) => palette.primary}>
                            {translate("total")}:{" "}
                        </Typography>
                        <Balance
                            balance={Number(amount) + Number(fee)}
                            variant="body2Strong"
                            units={token}
                            color={(palette) => palette.primary}
                        />
                    </Row>
                </Col>
                {children}
            </Col>
        </Container>
    );
};

export default BaseSendSummary;
