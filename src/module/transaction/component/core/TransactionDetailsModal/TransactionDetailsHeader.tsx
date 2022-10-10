import TransactionIcon from "module/transaction/component/display/TransactionIcon/TransactionIcon";
import { Col, Typography } from "@peersyst/react-native-components";
import TransactionLabel from "module/transaction/component/display/TransactionLabel/TransactionLabel";
import TransactionAmount from "module/transaction/component/display/TransactionAmount/TransactionAmount";
import formatDate from "utils/formatDate";
import { FullTransaction } from "module/common/service/CkbSdkService.types";
import { TransactionType } from "ckb-peersyst-sdk";
import { useTranslate } from "module/common/hook/useTranslate";

export interface TransactionDetailsHeaderProps {
    transaction: FullTransaction;
}

const TransactionDetailsHeader = ({ transaction: { type, amount, token, timestamp } }: TransactionDetailsHeaderProps): JSX.Element => {
    const showAmount = type !== TransactionType.SEND_NFT && type !== TransactionType.RECEIVE_NFT;
    const t = useTranslate();
    return (
        <Col alignItems="center" gap={10}>
            <TransactionIcon type={type} />
            <Col gap={5} alignItems="center">
                <TransactionLabel variant="h2" fontWeight="bold" type={type} />
                {showAmount && <TransactionAmount variant="h2" boldUnits type={type} fontWeight="bold" amount={amount} currency={token} />}
                {timestamp && <Typography variant="body2">{formatDate(new Date(timestamp), "date-hours", t("idiom"))}</Typography>}
            </Col>
        </Col>
    );
};

export default TransactionDetailsHeader;
