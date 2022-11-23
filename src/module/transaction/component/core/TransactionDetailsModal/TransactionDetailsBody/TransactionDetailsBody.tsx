import { Col } from "@peersyst/react-native-components";
import TransactionDetail from "module/transaction/component/core/TransactionDetailsModal/TransactionDetailsBody/TransactionDetail";
import TransactionTypeDetails from "module/transaction/component/core/TransactionDetailsModal/TransactionDetailsBody/TransactionTypeDetails";
import { FullTransaction } from "near-peersyst-sdk";
import TransactionStatus from "module/transaction/component/display/TransactionStatus/TransactionStatus";
import BlockchainAddress from "module/common/component/display/BlockchainAddress/BlockchainAddress";
import { useTranslate } from "module/common/hook/useTranslate";

export interface TransactionDetailsBodyProps {
    transaction: FullTransaction;
}

const TransactionDetailsBody = ({ transaction }: TransactionDetailsBodyProps): JSX.Element => {
    const { transactionHash, status } = transaction;
    const translate = useTranslate();
    return (
        <Col gap={10} flex={1}>
            <TransactionTypeDetails transaction={transaction} />
            <TransactionDetail title={translate("status")}>
                <TransactionStatus status={status} variant="body3Regular" />
            </TransactionDetail>
            <TransactionDetail title={translate("hash")}>
                <BlockchainAddress address={transactionHash} type="tx" variant="body3Regular" length={8} />
            </TransactionDetail>
        </Col>
    );
};

export default TransactionDetailsBody;
