import { Transaction, TransactionType } from "module/transaction/types";
import TransactionIcon from "module/transaction/component/display/TransactionIcon/TransactionIcon";
import { Col, Typography } from "react-native-components";
import TransactionLabel from "module/transaction/component/display/TransactionLabel/TransactionLabel";
import TransactionAmount from "module/transaction/component/display/TransactionAmount/TransactionAmount";
import formatDate from "utils/formatDate";

export interface TransactionDetailsHeaderProps {
    transaction: Transaction;
}

const TransactionDetailsHeader = ({ transaction: { type, amount, token, timestamp } }: TransactionDetailsHeaderProps): JSX.Element => {
    const showAmount = type !== TransactionType.SMART_CONTRACT && type !== TransactionType.SEND_NFT && type !== TransactionType.RECEIVE_NFT;

    return (
        <Col alignItems="center" gap={10}>
            <TransactionIcon type={type} />
            <Col gap={5} alignItems="center">
                <TransactionLabel variant="h2" fontWeight="bold" type={type} />
                {showAmount && <TransactionAmount variant="h2" boldUnits type={type} fontWeight="bold" amount={amount} currency={token} />}
                <Typography variant="body2">{formatDate(timestamp)}</Typography>
            </Col>
        </Col>
    );
};

export default TransactionDetailsHeader;
