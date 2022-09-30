import TransactionIcon from "module/transaction/component/display/TransactionIcon/TransactionIcon";
import { Col, Typography } from "@peersyst/react-native-components";
import TransactionLabel from "module/transaction/component/display/TransactionLabel/TransactionLabel";
import TransactionAmount from "module/transaction/component/display/TransactionAmount/TransactionAmount";
import formatDate from "utils/formatDate";
import { FullTransaction } from "module/common/service/CkbSdkService.types";
import { TransactionType } from "ckb-peersyst-sdk";

export interface TransactionDetailsHeaderProps {
    transaction: FullTransaction;
}

const TransactionDetailsHeader = ({ transaction: { type, amount, token, timestamp } }: TransactionDetailsHeaderProps): JSX.Element => {
    const showAmount = type !== TransactionType.SEND_NFT && type !== TransactionType.RECEIVE_NFT;

    return (
        <Col alignItems="center" gap={10}>
            <TransactionIcon type={type} />
            <Col gap={5} alignItems="center">
                <TransactionLabel variant="body1Strong" type={type} />
                {showAmount && <TransactionAmount variant="body1Strong" type={type} balance={amount} units={token} />}
                {timestamp && <Typography variant="body4Regular">{formatDate(new Date(timestamp))}</Typography>}
            </Col>
        </Col>
    );
};

export default TransactionDetailsHeader;
