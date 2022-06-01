import { Col, createModal, ExposedBackdropProps } from "react-native-components";
import { TransactionDetailsModalRoot } from "module/transaction/component/core/TransactionDetailsModal/TransactionDetailsModal.styles";
import TransactionDetailsHeader from "module/transaction/component/core/TransactionDetailsModal/TransactionDetailsHeader";
import TransactionDetailsBody from "module/transaction/component/core/TransactionDetailsModal/TransactionDetailsBody/TransactionDetailsBody";
import { FullTransaction } from "module/common/service/CkbSdkService.types";

export interface TransactionDetailsModalProps extends ExposedBackdropProps {
    transaction: FullTransaction;
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
