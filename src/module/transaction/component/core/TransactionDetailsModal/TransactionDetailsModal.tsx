import { Col, createModal, ExposedBackdropProps } from "react-native-components";
import { Transaction } from "module/transaction/types";
import { TransactionDetailsModalRoot } from "module/transaction/component/core/TransactionDetailsModal/TransactionDetailsModal.styles";
import TransactionDetailsHeader from "module/transaction/component/core/TransactionDetailsModal/TransactionDetailsHeader";

export interface TransactionDetailsModalProps extends ExposedBackdropProps {
    transaction: Transaction;
}

const TransactionDetailsModal = createModal(({ transaction, ...rest }: TransactionDetailsModalProps) => {
    const { type, amount, token, timestamp } = transaction;
    return (
        <TransactionDetailsModalRoot {...rest}>
            <Col>
                <TransactionDetailsHeader transaction={transaction} />
            </Col>
        </TransactionDetailsModalRoot>
    );
});

export default TransactionDetailsModal;
