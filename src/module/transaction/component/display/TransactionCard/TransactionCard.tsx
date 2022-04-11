import { Col, Row, Typography } from "react-native-components";
import formatDate from "utils/formatDate";
import { TransactionCardRoot } from "./TransactionCard.styles";
import { Transaction, TransactionType } from "module/transaction/types";
import TransactionIcon from "module/transaction/component/display/TransactionIcon/TransactionIcon";
import TransactionAmount from "module/transaction/component/display/TransactionAmount/TransactionAmount";
import TransactionLabel from "module/transaction/component/display/TransactionLabel/TransactionLabel";

export interface TransactionCardProps {
    transaction: Transaction;
}

const TransactionCard = ({ transaction: { timestamp, amount, type, token = "CKB" } }: TransactionCardProps): JSX.Element => {
    const showAmount = type !== TransactionType.SMART_CONTRACT && type !== TransactionType.SEND_NFT && type !== TransactionType.RECEIVE_NFT;

    return (
        <TransactionCardRoot>
            <TransactionIcon type={type} />
            <Col gap={2} flex={1}>
                <Row justifyContent="space-between">
                    <TransactionLabel variant="body1" fontWeight="bold" type={type} />
                    {showAmount && (
                        <TransactionAmount variant="body1" boldUnits type={type} fontWeight="bold" amount={amount} currency={token} />
                    )}
                </Row>
                <Row justifyContent="space-between">
                    <Typography variant="body2" style={{ marginLeft: 10 }}>
                        {formatDate(timestamp)}
                    </Typography>
                </Row>
            </Col>
        </TransactionCardRoot>
    );
};

export default TransactionCard;
