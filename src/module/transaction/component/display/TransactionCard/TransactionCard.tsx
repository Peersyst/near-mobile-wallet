import { Transaction } from "module/transaction/types";
import { Col, Row, Typography } from "react-native-components";
import formatDate from "utils/formatDate";
import Balance from "module/wallet/component/display/Balance/Balance";
import { TransactionCardRoot, TransactionIcon } from "./TransactionCard.styles";
import { TransactionCardProps } from "./TransactionCard.types";

const TransactionCard = ({ timestamp, TxIcon, label, topBalance, bottomBalance }: TransactionCardProps): JSX.Element => {
    return (
        <TransactionCardRoot>
            <TransactionIcon>{TxIcon}</TransactionIcon>
            <Col gap={2} flex={1}>
                <Row justifyContent="space-between">
                    <Typography variant="body1" fontWeight="bold">
                        {label}
                    </Typography>
                    <Balance {...topBalance} variant="body1" fontWeight="bold" />
                </Row>
                <Row justifyContent="space-between">
                    <Typography variant="body2" style={{ marginLeft: 10 }}>
                        {formatDate(timestamp)}
                    </Typography>
                    <Balance {...bottomBalance} variant="body1" />
                </Row>
            </Col>
        </TransactionCardRoot>
    );
};

export default TransactionCard;
