import { Transaction } from "module/transaction/types";
import { Col, Row, Typography } from "react-native-components";
import { TransactionCardRoot, TransactionIcon } from "module/transaction/component/display/TransactionCard/TransactionCard.styles";
import formatDate from "utils/formatDate";
import Balance from "module/wallet/component/display/Balance/Balance";
import formatNumber from "utils/formatNumber";
import { TransactionReceivedIcon, TransactionSentIcon } from "icons";

export type TransactionCardProps = Transaction;
const tokens = ["CKB", "CKB", "CKB", "ETH", "USDC", "TAI", "CKB", "CKB", "COOP", "CKB"];

const TransactionCard = ({ timestamp }: TransactionCardProps): JSX.Element => {
    const seed = Math.random();
    const received = seed > 0.5;
    const token = tokens[Math.trunc(seed * 10)];

    return (
        <TransactionCardRoot>
            <TransactionIcon>{received ? <TransactionReceivedIcon /> : <TransactionSentIcon />}</TransactionIcon>
            <Col gap={2} flex={1}>
                <Row justifyContent="space-between">
                    <Typography variant="body1" fontWeight="bold">
                        {received ? "Received" : "Sent"}
                    </Typography>
                    <Balance
                        balance={((timestamp.getTime() * (1 + Math.random())) / Math.pow(12, 9)).toFixed(2)}
                        units={token}
                        variant="body1"
                        action={received ? "add" : "subtract"}
                        fontWeight="bold"
                        boldUnits
                    />
                </Row>
                <Row justifyContent="space-between">
                    <Typography variant="body2" style={{ marginLeft: 10 }}>
                        {formatDate(timestamp)}
                    </Typography>
                    <Typography variant="body2">
                        {formatNumber(((timestamp.getTime() * (1 + Math.random())) / Math.pow(10, 9)).toFixed(2), { minDecimals: 2 })} USD
                    </Typography>
                </Row>
            </Col>
        </TransactionCardRoot>
    );
};

export default TransactionCard;
