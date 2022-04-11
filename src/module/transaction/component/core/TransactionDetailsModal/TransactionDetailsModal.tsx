import { Col, createModal, ExposedBackdropProps } from "react-native-components";
import { Transaction } from "module/transaction/types";
import { TransactionDetailsModalRoot } from "module/transaction/component/core/TransactionDetailsModal/TransactionDetailsModal.styles";
import TransactionDetailsHeader from "module/transaction/component/core/TransactionDetailsModal/TransactionDetailsHeader";
import TransactionDetailsBody from "module/transaction/component/core/TransactionDetailsModal/TransactionDetailsBody/TransactionDetailsBody";

export interface TransactionDetailsModalProps extends ExposedBackdropProps {
    transaction: Transaction;
}

const TransactionDetailsModal = createModal(({ transaction, ...rest }: TransactionDetailsModalProps) => {
    return (
        <TransactionDetailsModalRoot showCloseButton {...rest}>
            <Col flex={1} gap={20}>
                <TransactionDetailsHeader transaction={transaction} />
                <TransactionDetailsBody transaction={transaction} />
            </Col>
        </TransactionDetailsModalRoot>
    );
});

export default TransactionDetailsModal;
