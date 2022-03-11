import { Transaction } from "module/transaction/types";
import { Col, Row, Typography } from "react-native-components";
import { TransactionCardRoot, TransactionIcon } from "module/transaction/component/display/TransactionCard/TransactionCard.styles";
import formatDate from "utils/formatDate";
import Balance from "module/wallet/component/display/Balance/Balance";
import formatNumber from "utils/formatNumber";

export type TransactionCardProps = Transaction;

const TransactionCard = ({ timestamp }: TransactionCardProps): JSX.Element => (
    <TransactionCardRoot>
        <TransactionIcon />
        <Col gap={2} flex={1}>
            <Row justifyContent="space-between">
                <Typography variant="body1" fontWeight="bold">
                    This is a transaction
                </Typography>
                <Balance balance="200" units="CKB" variant="body1" action="add" fontWeight="bold" boldUnits />
            </Row>
            <Row justifyContent="space-between">
                <Typography variant="body2" style={{ marginLeft: 10 }}>
                    {formatDate(timestamp)}
                </Typography>
                <Typography variant="body2">{formatNumber(12635.3, { minDecimals: 2 })} USD</Typography>
            </Row>
        </Col>
    </TransactionCardRoot>
);

export default TransactionCard;
